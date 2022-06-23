import React, { Component } from "react";
import API from "../api";

const LastRecipesContext = React.createContext();

export class LastRecipesProvider extends Component {
  state = {
    data: [],
    errors: [],
    fetching: true,
  };

  async fetchRecipes() {
    const url = `recipes/last/3`;
    this.setState({ fetching: true });

    try {
      const response = await API.get(url);

      this.setState({
        data: response.data.length === undefined ? [] : response.data,
        fetching: false,
      });
    } catch (err) {
      this.setState({
        errors: err.response?.data?.errors || ["Unknown error"],
        fetching: false,
      });
    }
  }

  componentDidMount() {
    this.fetchRecipes();
  }

  render() {
    const { data, errors, fetching } = this.state;

    return (
      <LastRecipesContext.Provider
        value={{
          data,
          errors,
          fetching,
        }}
      >
        {this.props.children}
      </LastRecipesContext.Provider>
    );
  }
}

export default LastRecipesContext;
