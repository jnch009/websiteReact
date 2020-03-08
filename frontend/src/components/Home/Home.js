import React from "react";

import "./Home.css";

function Home() {
  const sID = require("shortid");
  const classNames = require("classnames");
  const gridLabels = ["About", "Tekken 7", "Blog"];
  const gridCSS = ["aboutCSS", "tekkenCSS", "blogCSS"];
  const gridItems = [];

  for (let [i, lbl] of gridLabels.entries()) {
    let cssComponent = classNames("homeGrid", gridCSS[i]);
    gridItems.push(
      <div className={cssComponent} key={sID.generate()}>
        <h1>{lbl}</h1>
      </div>
    );
  }

  return <div className="flexContainer">{gridItems}</div>;
}

export default Home;
