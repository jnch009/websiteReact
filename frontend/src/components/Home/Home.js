import React from "react";

import "./Home.css";

function Home() {
  const sID = require("shortid");
  const gridLabels = ['About', 'Tekken 7', 'Blog'];
  const gridItems = [];
  for (let lbl of gridLabels) {
    gridItems.push(<div className="homeGrid" key={sID.generate()}><h1>{lbl}</h1></div>);
  }

  return <div className="flexContainer">{gridItems}</div>;
}

export default Home;
