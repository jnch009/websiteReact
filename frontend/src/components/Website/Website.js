import React, { Component } from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Button, ButtonGroup } from "shards-react";

import About from "../About/About";
import Blog from "../Blog";
import Home from "../Home/Home.js";
import Profile from "../Profile/Profile.js";
import Projects from "../Projects";

import "./Website.css";

class Website extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }

  componentDidMount() {
    fetch("http://localhost:3001/profile", { credentials: "include" })
      .then(() => {
        this.setState({ loggedIn: true });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="pageContainer">
        <Router>
          <Breadcrumb>
            <div className="flex_1">
              <BreadcrumbItem>
                <Link to="/">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link to="/about">About</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link to="/projects">Accomplishments</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link to="/blog">Blog</Link>
              </BreadcrumbItem>
            </div>
            <div className="flex_2"></div>
            <BreadcrumbItem>
              {this.state.loggedIn ? (
                <a href="/profile">Profile</a>
              ) : (
                <a href="http://localhost:3001/login">Login</a>
              )}
            </BreadcrumbItem>
            <hr />
          </Breadcrumb>

          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/projects">
              <Projects />
            </Route>
            <Route path="/blog">
              <Blog />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
// transition: <property> <duration> <timing-function> <delay>;

export default Website;
