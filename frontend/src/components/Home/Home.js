import React, { useEffect } from "react";

import { useAuth0 } from "../../react-auth0-spa";
import addAccessToken from "../../utils/commonRequests.js";

import "./Home.css";

const sID = require("shortid");
const classNames = require("classnames");
const gridLabels = ["About", "Tekken 7", "Blog"];
const gridCSS = ["aboutCSS", "tekkenCSS", "blogCSS"];
const gridRedirects = ["/about", "/projects", "/blog"];
let gridItems;

function Home() {
  const { isAuthenticated, user, getTokenSilently } = useAuth0();
  // should be fetching on load of the Home page and NOT the Navigation bar (Website component)
  // that was my mistake earlier
  useEffect(() => {
    if (isAuthenticated) {
      // first async function written! Getting Token silently
      async function silentToken() {
        const token = await getTokenSilently();
      }
      silentToken();
    }
    //addAccessToken(isAuthenticated, user);
  });

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
