import React from 'react';
import './Website.css'
import Projects from '../Projects';
import Blog from '../Blog';
import News from '../News';
import About from '../About';
import Login from '../Login';
import Register from '../Register';
import { Button,ButtonGroup,Breadcrumb, BreadcrumbItem } from "shards-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// function RouteTest(){
//   return (
//     // {/* <Router>
//     //   <Breadcrumb>
//     //     <div class="flex_1">
//     //       <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
//     //       <BreadcrumbItem><Link to="/about/">About</Link></BreadcrumbItem>
//     //       <BreadcrumbItem><Link to="/projects/">Projects</Link></BreadcrumbItem>
//     //       <BreadcrumbItem><Link to="/blog/">Blog</Link></BreadcrumbItem>
//     //       <BreadcrumbItem><Link to="/news/">What's New</Link></BreadcrumbItem>
//     //     </div><div class="flex_2"></div>
//     //     <BreadcrumbItem><Link to="/signin/">Login</Link></BreadcrumbItem>
//     //     <hr/>
//     //   </Breadcrumb>

//     //   <Route path="/" exact component={Home} />
//     //   <Route path="/about/" component={About} />
//     //   <Route path="/projects/" component={Projects} />
//     //   <Route path="/blog/" component={Blog} />
//     //   <Route path="/news/" component={News} />
//     //   <Route path="/signin" component={Login} />
//     //   <Route path="/register" component={Register}/>
//     // </Router> */}
//   )
// }

function Home() {
  const gridItems = [];
  for (let i = 0; i < 3; i++){
    gridItems.push(<div class="homeGrid"></div>);
  }

  return (
    <div class="flexContainer">
      {gridItems}
    </div>
  );
}

export default Home;
