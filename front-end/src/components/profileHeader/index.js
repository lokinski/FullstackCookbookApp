import React, { Component } from "react";
import { Breadcrumb } from "react-bootstrap";

import ProfileContext from "../../context/ProfileContext";

class ProfileHeader extends Component {
  static contextType = ProfileContext;

  render() {
    const profile = this.context;

    return (
      <Breadcrumb>
        <Breadcrumb.Item active>{profile.username}'s profile</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}

export default ProfileHeader;
