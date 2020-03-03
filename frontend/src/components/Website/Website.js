import React from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Button, ButtonGroup } from "shards-react";

import About from "../About/About";
import Blog from "../Blog";
import Home from "../Home/Home.js";
import Login from "../Login";
import Projects from "../Projects";
import Register from "../Register";

import "./Website.css";

function Website() {
  return (
    <div class="pageContainer">
      <Router>
        <Breadcrumb>
          <div class="flex_1">
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
          <div class="flex_2"></div>
          <BreadcrumbItem>
            <a href="http://localhost:3001/login">Login</a>
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
          <Route path="/login">
            <Login />
          </Route>
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
