import React from "react";

import "./Home.css";

const sID = require("shortid");
const classNames = require("classnames");
const gridLabels = ["About", "Tekken 7", "Blog"];
const gridCSS = ["aboutCSS", "tekkenCSS", "blogCSS"];
const gridRedirects = ["/about", "/projects", "/blog"];
let gridItems;

function Home() {
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

  return <div className="flexContainer">{gridItems}</div>;
}

export default Home;
