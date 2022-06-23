import React, { Component } from "react";
import API from "../api";

const CategoryContext = React.createContext();

export class CategoryProvider extends Component {
  state = {
    data: [],
    errors: [],
    fetching: true,
  };

  async fetchCategories() {
    const url = `categories`;
    this.setState({ fetching: true });

    try {
      const response = await API.get(url);

      const data = response.data.length === undefined ? [] : response.data;
      if (data.length > 0) {
        data.sort((a, b) => a.name > b.name);
      }

      this.setState({
        data: data,
        fetching: false
      });
    } catch (err) {
      this.setState({
        errors: err.response?.data?.errors || ["Unknown error"],
        fetching: false
      });
    }
  }

  componentDidMount() {
    this.fetchCategories();
  }

  render() {
    const { data, errors, fetching } = this.state;

    return (
      <CategoryContext.Provider
        value={{
          data,
          errors,
          fetching
        }}
      >
        {this.props.children}
      </CategoryContext.Provider>
    );
  }
}

export default CategoryContext;
