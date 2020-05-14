import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import _ from "lodash";
import { Button, Collapse } from "shards-react";

import { useAuth0 } from "../../react-auth0-spa";

import "./Profile.css";

const shortid = require("shortid");
const classNames = require("classnames");
const adminRole = "admin";
function Profile(props) {
  const { user } = useAuth0();
  const [open, setOpen] = useState(false);
  const { allUsers } = props;

  const showUserData = () => {
    setOpen(!open);
  };

  const handleLoad = () => {
    props.loadPage(true);
  };

  //TODO: Add a button to check for changes to the users table (DONE) Now style it :)

  return (
    <div className="pageContainerProfile">
      <Button onClick={handleLoad}>Reload</Button>
      {props.currentUser?.app_metadata?.roles?.includes(adminRole) ? (
        <Button onClick={showUserData}>Show User Format</Button>
      ) : (
        <Button disabled onClick={showUserData}>
          Show User Format
        </Button>
      )}
      <Collapse open={open}>
        <code>{JSON.stringify(props.currentUser, null, 2)}</code>
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
            {allUsers.map(user => (
              <tr
                key={shortid.generate()}
                className={
                  _.isEqual(user, props.currentUser) ? "currentUserRow" : null
                }
              >
                <td>{user["given_name"]}</td>
                <td>{user["email"]}</td>
                <td>{user["nickname"]}</td>
                <td>
                  {user?.app_metadata?.roles
                    ? user["app_metadata"]["roles"]
                    : null}
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
