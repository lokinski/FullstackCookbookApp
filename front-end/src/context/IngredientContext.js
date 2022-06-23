import React, { Component } from "react";
import API from "../api";

const IngredientContext = React.createContext();

export class IngredientProvider extends Component {
  state = {
    data: [],
    optionsData: [],
    errors: [],
    fetching: true,
  };

  async fetchIngredients() {
    const url = `ingredients`;
    this.setState({ fetching: true });

    try {
      const response = await API.get(url);

      this.setState({
        data: response.data.length === undefined ? [] : response.data,
        fetching: false,
      });

      this.updateOptionsData(response.data);
    } catch (err) {
      this.setState({
        errors: err.response?.data?.errors || ["Unknown error"],
        fetching: false,
      });
    }
  }

  updateOptionsData(data) {
    let result = [];
    for (let ingredient of data) {
      result.push({
        label: ingredient.name,
        value: ingredient._id,
      });
    }

    this.setState({ optionsData: result });
  }

  componentDidMount() {
    this.fetchIngredients();
  }

  render() {
    const { data, optionsData, errors, fetching } = this.state;

    return (
      <IngredientContext.Provider
        value={{
          data,
          optionsData,
          errors,
          fetching,
        }}
      >
        {this.props.children}
      </IngredientContext.Provider>
    );
  }
}

export default IngredientContext;