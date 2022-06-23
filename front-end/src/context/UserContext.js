import React, { Component } from "react";
import API from "../api";

const UserContext = React.createContext();

export class UserProvider extends Component {
  state = {
    username: "",
    email: "",
    roles: [],
    fetched: false,
    isLoggedIn: false,
  };

  login = async (email, password) => {
    if (!this.state.isLoggedIn) {
      const data = {
        email: email,
        password: password,
      };

      try {
        const response = await API.post("users/login", data);
        this.setState({
          username: response.data.username,
          email: response.data.email,
          roles: response.data.roles,
          fetched: true,
          isLoggedIn: true,
        });

        return {};
      } catch (err) {
        return {
          errors: err.response?.data?.errors || ["Unknown error"],
        };
      }
    }

    return {};
  };

  logout = async () => {
    if (this.state.isLoggedIn) {
      try {
        await API.post("users/logout");
        this.setState({
          username: "",
          email: "",
          roles: [],
          isLoggedIn: false,
        });

        return {};
      } catch (err) {
        return {
          errors: err.response?.data?.errors || ["Unknown error"],
        };
      }
    }

    return {};
  };

  register = async (username, email, password) => {
    if (!this.state.isLoggedIn) {
      const data = {
        username: username,
        email: email,
        password: password,
      };

      try {
        await API.post("users/register", data);

        return {};
      } catch (err) {
        return {
          errors: err.response?.data?.errors || ["Unknown error"],
        };
      }
    }

    return {};
  };

  async fetchProfile() {
    try {
      const response = await API.get("users/profile");

      this.setState({
        username: response.data.username,
        email: response.data.email,
        roles: response.data.roles,
        isLoggedIn: true,
        fetched: true
      });
    } catch (err) {
      this.setState({ fetched: true });
      if (err.response?.status !== 403) {
        console.log(err);
      }
    }
  }

  componentDidMount() {
    this.fetchProfile();
  }

  render() {
    const { login, logout, register } = this;
    const { username, email, roles, fetched, isLoggedIn } = this.state;

    return (
      <UserContext.Provider
        value={{
          username,
          email,
          roles,
          fetched,
          isLoggedIn,
          login,
          logout,
          register,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContext;
