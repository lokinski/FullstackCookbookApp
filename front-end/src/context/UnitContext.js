import React, { Component } from "react";
import API from "../api";

const UnitContext = React.createContext();

export class UnitProvider extends Component {
  state = {
    data: [],
    optionsData: [],
    errors: [],
    fetching: true,
  };

  async fetchUnits() {
    const url = `units`;
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
    for (let unit of data) {
      result.push({
        label: `${unit.shortcut} (${unit.name})`,
        value: unit._id,
      });
    }

    this.setState({ optionsData: result });
  }

  componentDidMount() {
    this.fetchUnits();
  }

  render() {
    const { data, optionsData, errors, fetching } = this.state;

    return (
      <UnitContext.Provider
        value={{
          data,
          optionsData,
          errors,
          fetching,
        }}
      >
        {this.props.children}
      </UnitContext.Provider>
    );
  }
}

export default UnitContext;
