import React from 'react';
import {Button} from 'shards-react';
import {Link} from "react-router-dom";
import {sha256} from 'js-sha256';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        };

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.enterClicked = this.enterClicked.bind(this);
    }

    onChangeUsername(e){
        this.setState({username: e.target.value});
    }

    onChangePassword(e){
        this.setState({password: e.target.value});
    }

    enterClicked(e){
        if (e.key === "Enter"){
            this.handleLoginClick();
        }
    }

    handleLoginClick(){
        const hashedPwd = sha256(this.state.password);
        const user = this.state.username; 
        
        var data = {
            username: `${user}`,
            password: `${hashedPwd}`
        }

        fetch('http://localhost:3001/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)})
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                },
                (error) => {
                    console.log(error)
                }
            );
    }

    render(){
        return(
            <div id="login">
                <Link id="register" to='/register'>Create a new account</Link>
                <div id="username">Username: <br/><input onChange={this.onChangeUsername} name="user" value={this.state.username}></input></div>
                <div id="password">Password: <br/><input type="password" onKeyDown={this.enterClicked} onChange={this.onChangePassword} name="pass" value={this.state.password}></input></div>
                <Button id="loginSubmit" onClick={this.handleLoginClick}>Submit</Button>
            </div>
        );
    }
}

export default Login;