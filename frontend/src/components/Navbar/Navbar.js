import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "shards-react";

import { useAuth0 } from "../../react-auth0-spa";

import "./Navbar.css";

// TODO: let's refactor this into a navbar component and then render it on each page

function Navbar() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <Breadcrumb>
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
          {isAuthenticated ? (
            <BreadcrumbItem>
              <Link to="/profile">Profile</Link>
            </BreadcrumbItem>
          ) : null}
        </div>
        <div className="flex_2"></div>
        <BreadcrumbItem>
          {isAuthenticated ? (
            <Link to="/logout">Logout</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </BreadcrumbItem>
        <hr />
      </Breadcrumb>
    </>
  );
}
// transition: <property> <duration> <timing-function> <delay>;

export default Navbar;
