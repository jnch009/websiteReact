import React from 'react';
import {Card, CardHeader} from "shards-react";

var mysql = require('mysql');
var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA,
    port: process.env.DB_PORT
});

function Projects(){
    return (
        <Card>
            <CardHeader>This is the Projects Page</CardHeader>
        </Card>
    )
}

export default Projects;