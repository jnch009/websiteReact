import React from 'react';
import {Button} from 'shards-react';

function Login(){
    return(
        <div id="login">
            <div id="username">Username: <br/><input name="user"></input></div>
            <div id="password">Password: <br/><input name="pass"></input></div>
            <Button id="loginSubmit">Submit</Button>
        </div>
    );
}

export default Login;