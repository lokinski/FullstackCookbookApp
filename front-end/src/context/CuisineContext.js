import React, { Component } from "react";
import API from "../api";

const CuisineContext = React.createContext();

export class CuisineProvider extends Component {
  state = {
    data: [],
    errors: [],
    fetching: true,
  };

  async fetchCuisines() {
    const url = `cuisines`;
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
    this.fetchCuisines();
  }

  render() {
    const { data, errors, fetching } = this.state;

    return (
      <CuisineContext.Provider
        value={{
          data,
          errors,
          fetching
        }}
      >
        {this.props.children}
      </CuisineContext.Provider>
    );
  }
}

export default CuisineContext;
