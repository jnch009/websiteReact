import React from "react";

import "./Home.css";

function Home() {
  const sID = require("shortid");
  const classNames = require("classnames");
  const gridLabels = ["About", "Tekken 7", "Blog"];
  const gridCSS = ["aboutCSS", "tekkenCSS", "blogCSS"];
  const gridRedirects = ["/about", "/projects", "/blog"];

  const gridItems = [];

  for (let [i, lbl] of gridLabels.entries()) {
    let cssComponent = classNames("homeGrid", gridCSS[i]);
    let gridRedirect = gridRedirects[i];

    gridItems.push(
      <div key={sID.generate()} className={cssComponent}>
        <h1>
          <a className="homePageLinks" href={gridRedirect}>{lbl}</a>
        </h1>
      </div>
    );
  }

  return <div className="flexContainer">{gridItems}</div>;
}

export default Home;
