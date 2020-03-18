import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Link, Route, Router, Switch } from "react-router-dom";

import { useAuth0 } from "../../react-auth0-spa";
import history from "../../utils/history";
import About from "../About/About";
import Blog from "../Blog/Blog";
import Home from "../Home/Home.js";
import Navbar from "../Navbar/Navbar";
import PrivateRoute from "../PrivateRoute";
import Profile from "../Profile/Profile.js";
import Projects from "../Projects/Projects";

import "./Website.css";

const classNames = require("classnames");

function Website() {
  const { loginWithRedirect, logout, user } = useAuth0();
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const getUsers = async () => {
      await fetch("http://localhost:3001/getUsers")
        .then(res => {
          return res.json();
        })
        .then(data => {
          return JSON.stringify(data);
        })
        .then(jsonStr => {
          if (!_.isEqual(allUsers, JSON.parse(jsonStr))) {
            setAllUsers(JSON.parse(jsonStr));
          }
          setLoading(false);
        });
    };
    getUsers();
  });

  if (loading) {
    return (
      <div className={classNames("loadingIndicator", "pageContainer")}>
        <i class="fas fa-sync fa-spin spinner-size"></i>
      </div>
    );
  }

  if (currentUser === undefined) {
    allUsers.map(serverUser => {
      if (serverUser?.user_id === user?.sub) {
        setCurrentUser(serverUser);
      }
    });
  }

  return (
    <div className="App">
      <Router history={history}>
        <Navbar />
        <Switch>
          <Route path="/about" component={About} />
          {/* https://tylermcginnis.com/react-router-pass-props-to-components/ */}
          <Route
            path="/projects"
            render={props => <Projects {...props} currentUser={currentUser} />}
          />
          <Route path="/blog" component={Blog} />
          <PrivateRoute
            path="/profile"
            render={props => (
              <Profile
                {...props}
                currentUser={currentUser}
                allUsers={allUsers}
                loadPage={setLoading}
              />
            )}
          />
          <Route path="/login" component={() => loginWithRedirect({})} />
          <Route path="/logout" component={() => logout({})} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default Website;
