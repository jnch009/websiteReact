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
var passport = require("passport");
var Auth0Strategy = require("passport-auth0");
const dotEnvPath = path.resolve(process.cwd(), "credentials.env");

// function main() {
var app = express();
var session = require("express-session");
var randomSecret = require("randomstring");
var dotenv = require("dotenv").config({ path: dotEnvPath });
var con = mysql.createConnection({
  host: process.env.LOCAL_DB_HOST,
  user: process.env.LOCAL_DB_USER,
  password: process.env.LOCAL_DB_PASS,
  database: process.env.LOCAL_DB_SCHEMA,
  port: process.env.LOCAL_DB_PORT
});

var sess = {
  secret: randomSecret.generate(),
  cookie: {},
  resave: false,
  saveUninitialized: true
};

if (app.get("env") === "production") {
  // Use secure cookies in production (requires SSL/TLS)
  sess.cookie.secure = true;

  // Uncomment the line below if your application is behind a proxy (like on Heroku)
  // or if you're encountering the error message:
  // "Unable to verify authorization request state"
  // app.set('trust proxy', 1);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use(session(sess));

// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || "http://localhost:3001/callback"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());

// You can use this section to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var authRouter = require("./routes/auth");
var usersRouter = require("./routes/users");
app.use("/", authRouter);
app.use("/", usersRouter);
con.connect(() => {});

let getAccessToken = (req, res, next) => {
  // This if statement needs to be refactored
  // with a SQL query instead
  if (process.env.AUTH0_ACCESS_TOKEN !== "") {
    next();
  }

  var postData = querystring.stringify({
    grant_type: "client_credentials",
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    audience: "https://jnch009.auth0.com/api/v2/"
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
      req.jwtDecode = JSON.parse(data);
      resulting.end();
      next();
    });
  });

  // Why am I doing this?
  // Because I need to write to the buffer that was created in Content - Length
  resulting.write(postData);
};

app.post("/setAccessToken", getAccessToken, (req, res) => {
  let params = req.body.uid;
  let { access_token } = req.jwtDecode;
  let { exp, iat } = jwt.decode(access_token);
  let qString =
    "INSERT INTO users(access_token,iat,exp,user_id) VALUES(?,?,?,?)";
  let query = con.query(qString, [access_token, iat, exp, params], error => {
    if (error) {
      return error;
    }
  });
  res.status(200).end();
});

//Get all users
app.get("/getUsers", getAccessToken, (req, res) => {
  const options = {
    hostname: "jnch009.auth0.com",
    headers: {
      Authorization: `Bearer ${process.env.AUTH0_ACCESS_TOKEN}`
    },
    path: "/api/v2/users"
  };
  let resulting = https.request(options, res => {
    res.setEncoding("utf8");
    res.on("data", function(body) {
      console.log(JSON.parse(body));
    });
  });

  resulting.end();
  res.end();
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

//   resulting.end();
// });

// con.connect();

// // let handlers = new HandlerGenerator();
// // app.post('/login', handlers.login);
// // app.get('/',middleware.checkToken,handlers.index);

// var qString = "SELECT * FROM Projects";
// app.get("/projects", (req, res) => {
//   con.query(qString, function(err, tup, fields) {
//     if (err) throw err;
//     res.json(tup);
//   });
// });

// app.get("/projects/:id", (req, res) => {
//   con.query("SELECT * FROM Projects WHERE Id = ?", [req.params.id], function(
//     err,
//     tup,
//     fields
//   ) {
//     if (err) throw err;

//     const project = tup.map(t => {
//       return { title: t.Title, author: t.Author };
//     });

//     res.json(project);
//   });
// });

// app.post("/projects/add", (req, res) => {
//   var postData = req.body;
//   con.query(
//     "INSERT INTO Projects SET ?",
//     postData,
//     (error, results, fields) => {
//       if (error) throw error;
//       res.end(JSON.stringify(results));
//     }
//   );
// });

// app.get("/user/:uid/pass/:pwd", (req, res) => {
//   con.query(
//     "SELECT * FROM Users WHERE Username = ? && Password = ?",
//     [req.params.uid, req.params.pwd],
//     function(err, tup, fields) {
//       if (err) throw error;
//       if (JSON.stringify(tup) != "[]") {
//         res.json(true);
//       } else {
//         res.json(false);
//       }
//     }
//   );
// });

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
