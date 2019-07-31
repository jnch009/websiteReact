/*import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import './index.css';
import Website from './components/Website';
import * as serviceWorker from './serviceWorker';*/
require('dotenv').config({path:__dirname+'\\credentials.env'});
var express = require("express");
var app = express();

app.listen(3000, () => {
    console.log("Server running on port 3000");
    //console.log(process.env.DB_HOST);
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

app.get("/projects", (req, res) => {
    //res.json(["Tony","Lisa","Michael","Ginger","Food"]);
    con.query('SELECT * FROM Projects', function (err, tup, fields) {
        if (err) throw err;
        res.json(tup);
    })
});

//con.end();

/*
ReactDOM.render(<Website />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
*/