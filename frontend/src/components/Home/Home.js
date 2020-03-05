import React from "react";
import "./Home.css";

function Home() {
  const gridLabels = ['About', 'Tekken 7', 'Blog'];
  const gridItems = [];
  for (let lbl of gridLabels) {
    gridItems.push(<div className="homeGrid"><h1>{lbl}</h1></div>);
  }

  return <div className="flexContainer">{gridItems}</div>;
}

export default Home;
