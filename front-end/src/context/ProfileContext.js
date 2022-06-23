import React, { Component } from "react";
import API from "../api";

const ProfileContext = React.createContext();

export class ProfileProvider extends Component {
  state = {
    data: [],
    username: this.props.username,
    found: false,
    errors: [],
    fetching: true,
  };

  async fetchProfileData() {
    const url = `users/profile/${this.props.username}`;
    this.setState({ fetching: true });

    try {
      const response = await API.get(url);

      this.setState({
        username: this.props.username,
        data: response.data.recipes,
        found: true,
        fetching: false
      });
    } catch (err) {
      this.setState({
        errors: err.response?.data?.errors || ["Unknown error"],
        fetching: false,
        found: false
      });
    }
  }

  componentDidMount() {
    this.fetchProfileData();
  }

  render() {
    const { data, username, found, errors, fetching } = this.state;

    return (
      <ProfileContext.Provider
        value={{
          data,
          username,
          found,
          errors,
          fetching,
        }}
      >
        {this.props.children}
      </ProfileContext.Provider>
    );
  }
}

export default ProfileContext;
