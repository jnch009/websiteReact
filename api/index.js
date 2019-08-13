require('dotenv').config({path:__dirname+'\\credentials.env'});
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
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