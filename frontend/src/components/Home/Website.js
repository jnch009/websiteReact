import React from "react";
import "./Website.css";
import Projects from "../Projects";
import Blog from "../Blog";
import News from "../News";
import About from "../About";
import Login from "../Login";
import Register from "../Register";
import { Button, ButtonGroup, Breadcrumb, BreadcrumbItem } from "shards-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Home() {
  const gridItems = [];
  for (let i = 0; i < 3; i++) {
    gridItems.push(<div class="homeGrid"></div>);
  }

  return (
    <div class="pageContainer">
        <Breadcrumb>
          <div class="flex_1">
            <BreadcrumbItem>
              Home
            </BreadcrumbItem>
            <BreadcrumbItem>
              About
            </BreadcrumbItem>
            <BreadcrumbItem>
              Accomplishments
            </BreadcrumbItem>
            <BreadcrumbItem>
              Blog
            </BreadcrumbItem>
          </div>
          <div class="flex_2"></div>
          <BreadcrumbItem>
            Login
          </BreadcrumbItem>
          <hr />
        </Breadcrumb>
      <div class="flexContainer">{gridItems}</div>
    </div>
  );
}
// transition: <property> <duration> <timing-function> <delay>;

export default Home;
