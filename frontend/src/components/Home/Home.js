import React from "react";
import "./Home.css";

function Home() {
  const gridItems = [];
  for (let i = 0; i < 3; i++) {
    gridItems.push(<div class="homeGrid"></div>);
  }

  return <div class="flexContainer">{gridItems}</div>;
}

export default Home;
