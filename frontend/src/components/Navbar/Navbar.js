import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Button } from "shards-react";

import { useAuth0 } from "../../react-auth0-spa";

import "./Navbar.css";

// TODO: let's refactor this into a navbar component and then render it on each page
const className = require("classnames");
let buttonNav = className("buttonNav");
function Navbar() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <Breadcrumb className="websiteBreadcrumb">
        <div className="flex_1">
          <Link to="/">
            <Button className={buttonNav}>Home</Button>
          </Link>
          <Link to="/about">
            <Button className={buttonNav}>About</Button>
          </Link>
          <Link to="/projects">
            <Button className={buttonNav}>Accomplishments</Button>
          </Link>
          <Link to="/blog">
            <Button className={buttonNav}>Blog</Button>
          </Link>
          {isAuthenticated ? (
            <Link to="/profile">
              <Button className={buttonNav}>Profile</Button>
            </Link>
          ) : null}
        </div>
        <div className="flex_2"></div>
        {isAuthenticated ? (
          <Link to="/logout">
            <Button className={buttonNav}>Logout</Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button className={buttonNav}>Login</Button>
          </Link>
        )}
        <hr />
      </Breadcrumb>
    </>
  );
}
// transition: <property> <duration> <timing-function> <delay>;

export default Navbar;
