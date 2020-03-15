import React, { Fragment, useEffect, useState, useLayoutEffect } from "react";

import "./Profile.css";

import { useAuth0 } from "../../react-auth0-spa";
import { addAccessToken, getAllUsers } from "../../utils/commonRequests.js";

const shortid = require("shortid");
const classNames = require("classnames");
function Profile() {
  const { isAuthenticated, user } = useAuth0();
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch("http://localhost:3001/getUsers")
        .then(res => {
          return res.json();
        })
        .then(data => {
          return JSON.stringify(data);
        })
        .then(jsonStr => {
          setAllUsers([...allUsers, ...JSON.parse(jsonStr)]);
          setLoading(false);
        });
    };
    getUsers();
  }, []);

  if (loading) {
    return (
      <div className={classNames("loadingIndicator", "pageContainer")}>
        Loading...
      </div>
    );
  }

  return (
    <Fragment>
      {/* <img src={user.picture} alt="Profile" />

      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <code>{JSON.stringify(user, null, 2)}</code> */}
      {allUsers.map(v => (
        <div key={shortid.generate()}>
          <img src={v["picture"]} />
          <h1>{v["given_name"]}</h1>
          <br />
        </div>
      ))}
      <code>{JSON.stringify(user, null, 2)}</code>
    </Fragment>
  );
}

export default Profile;
