import React, { useEffect } from "react";

import { useAuth0 } from "../../react-auth0-spa";
import Navbar from "../Navbar/Navbar";

import "./Home.css";

const sID = require("shortid");
const classNames = require("classnames");
const gridLabels = ["About", "Tekken 7", "Blog"];
const gridCSS = ["aboutCSS", "tekkenCSS", "blogCSS"];
const gridRedirects = ["/about", "/projects", "/blog"];
let gridItems;

function Home() {
  // const { user } = useAuth0();

  // useEffect(() => {
  //   console.log(user);
  // });

  gridItems = [];
  for (let [i, lbl] of gridLabels.entries()) {
    let cssComponent = classNames("homeGrid", "homePageLinks", gridCSS[i]);
    let gridRedirect = gridRedirects[i];

    gridItems.push(
      <a className={cssComponent} href={gridRedirect}>
        <div key={sID.generate()}>
          <h1>{lbl}</h1>
        </div>
      </a>
    );
  }

  return (
    <>
      <div className="welcome">
        <h1>Welcome!</h1>
      </div>
      <div className="flexContainer">{gridItems}</div>
    </>
  );
}

export default Home;
