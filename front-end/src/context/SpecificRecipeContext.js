import React, { Component } from "react";
import API from "../api";

const SpecificRecipeContext = React.createContext();

export class SpecificRecipeProvider extends Component {
  state = {
    data: {},
    errors: [],
    id: this.props.id,
    found: false,
    fetching: true,
  };

  async fetchRecipe() {
    const url = `recipes/${this.props.id}`;
    this.setState({ fetching: true });

    try {
      const response = await API.get(url);

      this.setState({
        data: response.data ? response.data : {},
        id: this.props.id,
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
    this.fetchRecipe();
  }

  render() {
    const { data, errors, found, fetching } = this.state;

    return (
      <SpecificRecipeContext.Provider
        value={{
          data,
          errors,
          found,
          fetching,
        }}
      >
        {this.props.children}
      </SpecificRecipeContext.Provider>
    );
  }
}

export default SpecificRecipeContext;
