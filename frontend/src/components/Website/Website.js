import React, { Component, useState, useEffect } from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Button, ButtonGroup } from "shards-react";

import { useAuth0 } from "../../react-auth0-spa";
import About from "../About/About";
import Blog from "../Blog";
import Home from "../Home/Home.js";
import Profile from "../Profile/Profile.js";
import Projects from "../Projects";

import "./Website.css";

function Website() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  useEffect(() => {
    fetch("http://localhost:3001/profile", { credentials: "include" })
      .then(() => {
        this.setState({ loggedIn: true });
      })
      .catch(error => {
        console.log(error);
      });
  });

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
            {loggedIn ? (
              <a href="/profile">Profile</a>
            ) : (
              <Link to="/login">Login</Link>
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
          <Route path="/login">{() => loginWithRedirect({})}</Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
// transition: <property> <duration> <timing-function> <delay>;

export default Website;
