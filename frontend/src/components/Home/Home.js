import React, { useEffect } from "react";

import { useAuth0 } from "../../react-auth0-spa";
import Navbar from "../Navbar/Navbar";

import "./Home.css";

const sID = require("shortid");
const classNames = require("classnames");
const gridLabels = ["About", "Tekken", "Blog", "Contact"];
const gridRedirects = ["/about", "/projects", "/blog"];
let gridItems;

function Home() {
  // const { user } = useAuth0();

  // useEffect(() => {
  //   console.log(user);
  // });

  gridItems = [];
  for (let [i, lbl] of gridLabels.entries()) {
    let cssComponent = classNames("homeGrid", "homePageLinks");
    let gridRedirect = gridRedirects[i];

    gridItems.push(
      <div>
        <a className={cssComponent} href={gridRedirect}>
          <div key={sID.generate()}>
            <h1>{lbl}</h1>
          </div>
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="welcome">
        <h1 className="cover">Welcome!</h1>
      </div>
      <div className="gridItems">{gridItems}</div>
    </>
  );
}

export default Home;
