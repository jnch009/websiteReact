import React from "react";
import "./Website.css";
import Projects from "../Projects";
import Blog from "../Blog";
import News from "../News";
import About from "../About";
import Login from "../Login";
import Register from "../Register";
import { Button, ButtonGroup, Breadcrumb, BreadcrumbItem } from "shards-react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function Home() {
  const gridItems = [];
  for (let i = 0; i < 3; i++) {
    gridItems.push(<div class="homeGrid"></div>);
  }

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
              <BreadcrumbItem><Link to="/projects">Accomplishments</Link></BreadcrumbItem>
              <BreadcrumbItem><Link to="/blog">Blog</Link></BreadcrumbItem>
            </div>
            <div class="flex_2"></div>
            <BreadcrumbItem><Link to="/projects">Login</Link></BreadcrumbItem>
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
          </Switch>
      </Router>
      <div class="flexContainer">{gridItems}</div>
    </div>
  );
}
// transition: <property> <duration> <timing-function> <delay>;

export default Home;
