import React, { Component, useEffect, useState } from "react";
import { Link, Route, Router, Switch } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Button, ButtonGroup } from "shards-react";

import { useAuth0 } from "../../react-auth0-spa";
import history from "../../utils/history";
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
      <Router history={history}>
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
            {isAuthenticated ? (
              <BreadcrumbItem>
                <Link to="/profile">Profile</Link>
              </BreadcrumbItem>
            ) : null}
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
          <Route path="/about" component={About} />
          <Route path="/projects" component={Projects} />
          <Route path="/blog" component={Blog} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" component={() => loginWithRedirect({})} />
          <Route path="/logout" component={() => logout({})} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}
// transition: <property> <duration> <timing-function> <delay>;

export default Website;
