require('dotenv').config({path:__dirname+'\\credentials.env'});
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./middleware');

class HandlerGenerator {
    login (req, res) {
      let username = req.body.username;
      let password = req.body.password;
      // For the given username fetch user from DB
      let mockedUsername = 'admin';
      let mockedPassword = 'password';
  
      if (username && password) {
        if (username === mockedUsername && password === mockedPassword) {
          let token = jwt.sign({username: username},
            config.secret,
            { expiresIn: '24h' // expires in 24 hours
            }
          );
          // return the JWT token for the future API calls
          res.json({
            success: true,
            message: 'Authentication successful!',
            token: token
          });
        } else {
          res.send(403).json({
            success: false,
            message: 'Incorrect username or password'
          });
        }
      } else {
        res.send(400).json({
          success: false,
          message: 'Authentication failed! Please check the request'
        });
      }
    }
    index (req, res) {
      res.json({
        success: true,
        message: 'Index page'
      });
    }
  }

function main(){
    var app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(
        cors({
            origin: 'http://localhost:3000',
            credentials: true,
        })
    );

    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });

    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_SCHEMA,
        port: process.env.DB_PORT
    });

    let handlers = new HandlerGenerator();
    app.post('/login', handlers.login);

    con.connect();

    var qString = 'SELECT * FROM Projects';
    app.get("/projects", (req, res) => {
        con.query(qString, function (err, tup, fields) {
            if (err) throw err;
            res.json(tup);
        })
    });

    app.get("/projects/:id", (req, res) => {
        con.query('SELECT * FROM Projects WHERE Id = ?', [req.params.id], function (err, tup, fields) {
            if (err) throw err;
        
            const project = tup.map((t) => {
                return {title: t.Title,
                        author: t.Author}
            })
        
            res.json(project);
        })
    });

    app.post("/projects/add", (req, res) => {
        var postData = req.body;
        con.query('INSERT INTO Projects SET ?', postData, (error, results, 
            fields) => {
                if (error) throw error;
                res.end(JSON.stringify(results));
        });
    });

    app.get("/user/:uid/pass/:pwd", (req, res) => {
        con.query('SELECT * FROM Users WHERE Username = ? && Password = ?', [req.params.uid,req.params.pwd], function (err, tup, fields) {
            if (err) throw error;
            if (JSON.stringify(tup) != "[]"){
                res.json(true);
            } else {
                res.json(false);
            }
        })
    })
}

main();