import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Button } from "shards-react";

import { useAuth0 } from "../../react-auth0-spa";

import "./Navbar.css";

const className = require("classnames");
let buttonNav = className("buttonNav");
function Navbar() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <Breadcrumb className="websiteBreadcrumb">
        <ul className="navbarContainer">
          <li>
            <Link to="/">
              <Button className={buttonNav}>Home</Button>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <Button className={buttonNav}>About</Button>
            </Link>
          </li>
          <li>
            <Link to="/projects">
              <Button className={buttonNav}>Accomplishments</Button>
            </Link>
          </li>
          <li>
            <Link to="/blog">
              <Button className={buttonNav}>Blog</Button>
            </Link>
          </li>
          <li className="navbarGap">
            {isAuthenticated ? (
              <Link to="/profile">
                <Button className={buttonNav}>Profile</Button>
              </Link>
            ) : null}
            {isAuthenticated ? (
              <Link to="/logout">
                <Button className={buttonNav}>Logout</Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button className={buttonNav}>Login</Button>
              </Link>
            )}
          </li>
        </ul>
      </Breadcrumb>
    </>
  );
}
// transition: <property> <duration> <timing-function> <delay>;

export default Navbar;
