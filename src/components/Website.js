import React from 'react';
import Projects from './Projects';
import { Button,ButtonGroup,Breadcrumb, BreadcrumbItem } from "shards-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function RouteTest(){
  return (
    <Router>
      <Breadcrumb>
        <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
        <BreadcrumbItem>About</BreadcrumbItem>
        <BreadcrumbItem><Link to="/projects/">Projects</Link></BreadcrumbItem>
        <BreadcrumbItem>Blog</BreadcrumbItem>
        <BreadcrumbItem>What's New</BreadcrumbItem>
      </Breadcrumb>

      <Route path="/" exact component={Home} />
      <Route path="/projects/" component={Projects} />
    </Router>
  )
}

function Home() {
  return (
    <div>
      <hr/>
      <div>This is the home page</div>
    </div>
  );
}

export default RouteTest;
