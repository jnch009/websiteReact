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
        const { id, displayName, name, emails, nickname, picture } = JSON.parse(
          data.userProfile
        );
        this.setState({
          profileData: { id, displayName, name, emails, nickname, picture }
        });
      });
  }

  render() {
    const listID = this.state.profileData.id;
    return (
      <div>
        <ul>
          <div key={listID}><h1>{this.state.profileData.displayName}</h1></div>
          <div key={listID}><h5>{this.state.profileData.nickname}</h5></div>
          <img src={this.state.profileData.picture}></img>
        </ul>
      </div>
    );
  }
}

export default Profile;
