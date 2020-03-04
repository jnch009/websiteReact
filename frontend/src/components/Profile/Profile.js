import React from "react";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    fetch("http://localhost:3001/profile").then(results => {
      return results.json();
    }).then(data => {
        console.log(data);
    });
  }
}
