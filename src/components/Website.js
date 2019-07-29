import React from 'react';
import Projects from './Projects';
import { Button,ButtonGroup,Breadcrumb, BreadcrumbItem } from "shards-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function RouteTest(){
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/projects/">Projects</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Home} />
        <Route path="/projects/" component={Projects} />
      </div>
    </Router>
  )
}

function Home() {
  return (
    <div>
      <Breadcrumb>
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>About</BreadcrumbItem>
      <BreadcrumbItem>Projects</BreadcrumbItem>
      <BreadcrumbItem>Blog</BreadcrumbItem>
      <BreadcrumbItem>What's New</BreadcrumbItem>
        <ButtonGroup className="btnGrp" size="small">
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
        </ButtonGroup>
      </Breadcrumb>

      <hr/>

      <div>This is the home page</div>
    </div>
  );
}

export default RouteTest;
