import React from "react";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: {}
    };
  }

  componentWillMount() {
    fetch("http://localhost:3001/profile",{credentials: "include"})
      .then(results => {
        return results.json();
      })
      .then(data => {
        console.log(data);
      });
  }

  render() {
    return <div></div>;
  }
}

export default Profile;
