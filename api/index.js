var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
// let jwt = require("jsonwebtoken");
// let config = require("./config");
// let middleware = require("./middleware");
var mysql = require("mysql");
var path = require("path");
var passport = require("passport");
var Auth0Strategy = require("passport-auth0");
var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA,
  port: process.env.DB_PORT
});
const dotEnvPath = path.resolve(process.cwd(), "credentials.env");
function main() {
  var app = express();
  var session = require("express-session");
  var randomSecret = require("randomstring");
  var dotenv = require("dotenv").config({ path: dotEnvPath });

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

  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });

  var userInViews = require("./lib/middleware/userInViews");
  var authRouter = require("./routes/auth");
  var usersRouter = require("./routes/users");
  app.use(userInViews());
  app.use("/", authRouter);
  app.use("/", usersRouter);
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
}

main();
