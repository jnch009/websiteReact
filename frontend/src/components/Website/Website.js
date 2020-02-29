import React from "react";
import "./Website.css";
import Projects from "../Projects";
import Blog from "../Blog";
import Home from "../Home/Home.js";
import About from "../About";
import Login from "../Login";
import Register from "../Register";
import { Button, ButtonGroup, Breadcrumb, BreadcrumbItem } from "shards-react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

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
            <Link to="/login">Login</Link>
          </BreadcrumbItem>
          <hr />
        </Breadcrumb>

        <Switch>
          <Route path="/">
            <Home />
          </Route>
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
        </Switch>
      </Router>
    </div>
  );
}
// transition: <property> <duration> <timing-function> <delay>;

export default Website;
