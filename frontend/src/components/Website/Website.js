import React, { Component, useEffect, useState } from "react";
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
  const { isAuthenticated, loginWithRedirect, logout, loading } = useAuth0();
  const classNames = require("classnames");

  if (loading) {
    return (
      <div className={classNames("loadingIndicator", "pageContainer")}>
        Loading...
      </div>
    );
  }

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
            <BreadcrumbItem>
              {isAuthenticated ? <Link to="/profile">Profile</Link> : null}
            </BreadcrumbItem>
          </div>
          <div className="flex_2"></div>
          <BreadcrumbItem>
            {isAuthenticated ? (
              <Link to="/logout">Logout</Link>
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
          <Route path="/logout">{() => logout({})}</Route>
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
