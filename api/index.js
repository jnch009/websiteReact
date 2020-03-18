var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
let jwt = require("jsonwebtoken");
// let config = require("./config");
// let middleware = require("./middleware");
var querystring = require("querystring");
var https = require("https");
var mysql = require("mysql");
var path = require("path");
const dotEnvPath = path.resolve(process.cwd(), "credentials.env");
const jwksRsa = require("jwks-rsa");

var app = express();
var session = require("express-session");
var randomSecret = require("randomstring");
require("dotenv").config({ path: dotEnvPath });

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA,
  port: process.env.DB_PORT
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

con.connect(() => {});

// Define middleware that validates incoming bearer tokens
// using JWKS from jnch009.auth0.com
const verifyJWT = (req, res, next) => {
  let kid = jwt.decode(req.jwtDecode, { complete: true })["header"]["kid"];
  let signingKeys = jwksRsa({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  });

  signingKeys.getSigningKey(kid, (err, key) => {
    // possiblity that the key can return undefined
    const signingKey = key.getPublicKey();
    jwt.verify(
      req.jwtDecode,
      signingKey,
      {
        audience: process.env.AUDIENCE,
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        algorithms: ["RS256"]
      },
      (err, decoded) => {
        if (err) {
          res.status(401).send(err);
        } else {
          next();
        }
      }
    );
  });
};

let getAccessToken = (req, res, next) => {
  var postData = querystring.stringify({
    grant_type: "client_credentials",
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    audience: process.env.AUDIENCE
  });

  var options = {
    method: "POST",
    hostname: "jnch009.auth0.com",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(postData)
    },
    path: "/oauth/token"
  };

  let resulting = https.request(options, res => {
    let data = "";

    res.on("data", function(body) {
      data += body;
    });

    res.on("end", () => {
      let jwtObj = JSON.parse(data);
      req.jwtDecode = jwtObj["access_token"];
      resulting.end();
      next();
    });
  });

  resulting.on("error", e => {
    console.error(e);
  });

  // Why am I doing this?
  // Because I need to write to the buffer that was created in Content - Length
  resulting.write(postData);
  resulting.end();
};

//Get all users
app.get("/getUsers", getAccessToken, verifyJWT, (req, res) => {
  const options = {
    hostname: "jnch009.auth0.com",
    headers: {
      Authorization: `Bearer ${req.jwtDecode}`
    },
    path: "/api/v2/users"
  };
  let resulting = https.request(options, result => {
    let data = "";
    result.on("data", body => {
      data += body;
    });

    result.on("end", () => {
      res.json(JSON.parse(data));
    });
  });

  resulting.on("error", e => {
    console.error(e);
  });

  resulting.end();
});

//Get a specific user
app.get("/getUsers/:id", getAccessToken, (req, res) => {
  const options = {
    hostname: "jnch009.auth0.com",
    headers: {
      Authorization: `Bearer ${req.jwtDecode["access_token"]}`
    },
    path: "/api/v2/users/" + req.params.id
  };

  let resulting = https.request(options, result => {
    result.setEncoding("utf8");
    result.on("data", function(body) {
      req.User = JSON.parse(body);
    });

    result.on("end", () => {
      res.json({ user: req.User });
    });
  });

  resulting.end();
});

let qString = "SELECT * FROM Projects";
app.get("/projects", (req, res) => {
  con.query(qString, function(err, tup, fields) {
    if (err) throw err;
    res.json(tup);
  });
});

app.get("/projects/:id", (req, res) => {
  con.query(
    "SELECT * FROM Projects WHERE Id = ?",
    [req.params.id],
    (err, tup, fields) => {
      if (err) throw err;

      const project = tup.map(t => {
        return { title: t.Title, author: t.Author };
      });

      res.json(project);
    }
  );
});

app.post("/projects/add", (req, res) => {
  let {
    title,
    startDate,
    endDate,
    description,
    author,
    course,
    job
  } = req.body;
  con.query(
    "INSERT INTO Projects(Title,StartDate,EndDate,Description,Author,Course,Job) VALUES(?,?,?,?,?,?,?)",
    [title, startDate, endDate, description, author, course, job],
    (err, results) => {
      if (err) throw err;
      res.status(200).end();
    }
  );
});

//main();
if (app.get("env") !== "test") {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
}

module.exports = {
  app: app,
  getAccessToken: getAccessToken
};

// Most likely will not need this, but just practicing
// app.post("/setAccessToken", getAccessToken, (req, res) => {
//   let params = req.body.uid;
//   let { access_token } = req.jwtDecode;
//   let qString = "INSERT INTO users(uid,access_token) VALUES(?,?)";
//   let query = con.query(qString, [params, access_token], error => {
//     if (error) {
//       return error;
//     }
//   });
//   res.status(200).end();
// });
