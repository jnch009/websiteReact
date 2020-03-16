import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";

import { useAuth0 } from "../../react-auth0-spa";

import { Button, Collapse } from "shards-react";

import "./Profile.css";

const shortid = require("shortid");
const classNames = require("classnames");
const adminRole = "admin";
function Profile(props) {
  const { user } = useAuth0();
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

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

  const showUserData = () => {
    setOpen(!open);
  };

  return (
    <div className="pageContainerProfile">
      {props.currentUser?.app_metadata?.roles?.includes(adminRole) ? (
        <Button onClick={showUserData}>Show User Format</Button>
      ) : (
        <Button disabled onClick={showUserData}>
          Show User Format
        </Button>
      )}
      <Collapse open={open}>
        <code>{JSON.stringify(allUsers[0], null, 2)}</code>
      </Collapse>
      {/* TODO: sort this table https://www.npmjs.com/package/react-data-sort */}
      <div className="usersTable">
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Nickname</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map(v => (
              <tr key={shortid.generate()}>
                <td>{v["given_name"]}</td>
                <td>{v["email"]}</td>
                <td>{v["nickname"]}</td>
                <td>
                  {v?.app_metadata?.roles ? v["app_metadata"]["roles"] : null}
                </td>
                <td>
                  <div className="icon-container">
                    <i className="fas fa-edit"></i>
                    <i className="fas fa-trash"></i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Profile;
