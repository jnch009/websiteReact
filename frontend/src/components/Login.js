import React from 'react';
import {Button} from 'shards-react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        };

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onChangeUsername(e){
        this.setState({username: e.target.value});
    }

    onChangePassword(e){
        this.setState({password: e.target.value});
    }

    render(){
        return(
            <div id="login">
                <div id="username">Username: <br/><input onChange={this.onChangeUsername} name="user" value={this.state.username}></input></div>
                <div id="password">Password: <br/><input type="password" onChange={this.onChangePassword} name="pass" value={this.state.password}></input></div>
                <Button id="loginSubmit">Submit</Button>
                <Router>
                    <a>Create a new account.</a>
                </Router>
            </div>
        );
    }
}

export default Login;