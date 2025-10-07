import React from "react";
import "./Profile.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: {}
    };
  }

  componentWillMount() {
    fetch("http://localhost:3001/profile", { credentials: "include" })
      .then(results => {
        return results.json();
      })
      .then(data => {
        const { id, picture, displayName, nickname, emails } = JSON.parse(
          data.userProfile
        );
        this.setState({
          profileData: { id, picture, displayName, nickname, emails }
        });
      });
  }

  render() {
    const profileArray = Object.keys(this.state.profileData).map((i, index) => {
      if (i !== "id") {
        if (i === "picture") {
          return (
            <img key={index} className="profilePic" src={this.state.profileData[i]}></img>
          );
        } else if (i === "displayName") {
          return (
            <div key={index}>
              <h1>{this.state.profileData[i]}</h1>
            </div>
          );
        } else if (i === "emails") {
          return (
            <div key={index}>
              <h6>{this.state.profileData[i][0].value}</h6>
            </div>
          );
        }
      }
    });

    return <div className="profileStyling">{profileArray}</div>;
  }
}

export default Profile;
