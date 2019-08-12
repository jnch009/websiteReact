import React from 'react';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username = "",
            password = "",
            email = ""
        }
    }

    render(){
        return(
            <div id="login">
                <div id="username">Username: <br/><input onChange={this.onChangeUsername} name="user" value={this.state.username}></input></div>
                <div id="password">Password: <br/><input type="password" onChange={this.onChangePassword} name="pass" value={this.state.password}></input></div>
                <div id="email">Email: <br/><input type="email" onChange={this.onChangePassword} name="email" value={this.state.email}></input></div>
                <Button id="loginSubmit" onClick={this.handleRegisterClick}>Submit</Button>
            </div>
        );
    }
}

export default Register;