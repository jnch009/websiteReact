import React from 'react';
import Projects from './Projects';
import Blog from './Blog';
import News from './News';
import About from './About';
import { Button,ButtonGroup,Breadcrumb, BreadcrumbItem } from "shards-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function RouteTest(){
  return (
    <Router>
      <Breadcrumb>
        <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
        <BreadcrumbItem><Link to="/about/">About</Link></BreadcrumbItem>
        <BreadcrumbItem><Link to="/projects/">Projects</Link></BreadcrumbItem>
        <BreadcrumbItem><Link to="/blog/">Blog</Link></BreadcrumbItem>
        <BreadcrumbItem><Link to="/news/">What's New</Link></BreadcrumbItem>
      </Breadcrumb>

      <Route path="/" exact component={Home} />
      <Route path="/about/" component={About} />
      <Route path="/projects/" component={Projects} />
      <Route path="/blog/" component={Blog} />
      <Route path="/news/" component={News} />
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