import React, { Fragment, useEffect } from "react";

import { useAuth0 } from "../../react-auth0-spa";
import { addAccessToken, getAllUsers } from "../../utils/commonRequests.js";

let populatedUsers;
const Profile = () => {
  const { isAuthenticated, loading, user, getTokenSilently } = useAuth0();

  useEffect(() => {
    populatedUsers = getAllUsers(isAuthenticated, getTokenSilently);
    console.log(populatedUsers);
  });

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <img src={user.picture} alt="Profile" />

      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <code>{JSON.stringify(user, null, 2)}</code>
    </Fragment>
  );
};

export default Profile;
