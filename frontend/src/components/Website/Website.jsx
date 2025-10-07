import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Breadcrumbs, Link as BreadcrumbItem } from "@mui/material";

import About from "../About/About";
import Blog from "../Blog";
import Home from "../Home/Home.jsx";
import Profile from "../Profile/Profile.jsx";
import Projects from "../Projects"

import "./Website.css";

function Website() {
  return (
    <div className="pageContainer">
      <Router>
        <Breadcrumbs>
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
          </div>
          <div className="flex_2"></div>
          <BreadcrumbItem>
            <a href="http://localhost:3001/login">Login</a>
          </BreadcrumbItem>
          <hr />
        </Breadcrumbs>

        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}
// transition: <property> <duration> <timing-function> <delay>;

export default Website;
