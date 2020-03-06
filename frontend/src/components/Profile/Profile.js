import React from "react";

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
        const { id, displayName, nickname, picture } = JSON.parse(
          data.userProfile
        );
        this.setState({
          profileData: { id, displayName, nickname, picture }
        });
      });
  }

  render() {
    const profileArray = Object.keys(this.state.profileData).map((i, index) => {
      if (i !== "id") {
        if (i === "picture") {
          return <img className="profilePic" src={this.state.profileData[i]}></img>;
        }
        return <div key={index}>{this.state.profileData[i]}</div>;
      }
    });

    return (
      <div className="profileStyling">
        {profileArray}
      </div>
    );
  }
}

export default Profile;
