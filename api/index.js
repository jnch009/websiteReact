var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
let jwt = require("jsonwebtoken");
let config = require("./config");
let middleware = require("./middleware");
var mysql = require("mysql");
var path = require("path");
var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA,
  port: process.env.DB_PORT
});
const dotEnvPath = path.resolve(process.cwd(), 'credentials.env');

// class HandlerGenerator {
//     login (req, res) {
//       let username = req.body.username;
//       let password = req.body.password;

//       con.query('SELECT * FROM Users WHERE Username = ? && Password = ?',[username,password], function (err, tup) {
//             if (err){
//                 res.send(400).json({
//                     success: false,
//                     message: 'Authentication failed! Please check the request'
//                   });
//             }
//             if (JSON.stringify(tup) == "[]"){
//                 res.send(403).json({
//                     success: false,
//                     message: 'Incorrect username or password'
//                 });
//             } else {
//                 let token = jwt.sign({username: username},
//                     config.secret,
//                     { expiresIn: '24h' // expires in 24 hours
//                     }
//                   );
//                   // return the JWT token for the future API calls
//                   res.json({
//                     success: true,
//                     message: 'Authentication successful!',
//                     token: token
//                   });
//             }
//       });
//     }

//     index (req, res) {
//       console.log(req.decoded);
//       res.json({
//         success: true,
//         message: 'Index page'
//       });
//     }
//   }

function main() {
  var app = express();
  var session = require("express-session");
  var randomSecret = require("randomstring");
  var dotenv = require("dotenv").config({path: dotEnvPath});

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

  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });

  con.connect();

  // let handlers = new HandlerGenerator();
  // app.post('/login', handlers.login);
  // app.get('/',middleware.checkToken,handlers.index);

  var qString = "SELECT * FROM Projects";
  app.get("/projects", (req, res) => {
    con.query(qString, function(err, tup, fields) {
      if (err) throw err;
      res.json(tup);
    });
  });

  app.get("/projects/:id", (req, res) => {
    con.query("SELECT * FROM Projects WHERE Id = ?", [req.params.id], function(
      err,
      tup,
      fields
    ) {
      if (err) throw err;

      const project = tup.map(t => {
        return { title: t.Title, author: t.Author };
      });

      res.json(project);
    });
  });

  app.post("/projects/add", (req, res) => {
    var postData = req.body;
    con.query(
      "INSERT INTO Projects SET ?",
      postData,
      (error, results, fields) => {
        if (error) throw error;
        res.end(JSON.stringify(results));
      }
    );
  });

  app.get("/user/:uid/pass/:pwd", (req, res) => {
    con.query(
      "SELECT * FROM Users WHERE Username = ? && Password = ?",
      [req.params.uid, req.params.pwd],
      function(err, tup, fields) {
        if (err) throw error;
        if (JSON.stringify(tup) != "[]") {
          res.json(true);
        } else {
          res.json(false);
        }
      }
    );
  });
}

main();
