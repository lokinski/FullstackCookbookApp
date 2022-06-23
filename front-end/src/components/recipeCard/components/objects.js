import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import RecipeCard from "../";

export default class RecipeCardObjects extends Component {
  render() {
    return (
      <>
        {this.props.recipes.data.length > 0 ? (
          this.props.recipes.data.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              id={recipe._id}
              recipe={recipe}
              styleName="mb-4"
              variant="row3"
            />
          ))
        ) : !this.props.recipes.fetching ? (
          <Alert variant="danger" style={{ width: "100%" }}>
            No recipes found.
          </Alert>
        ) : (
          ""
        )}
      </>
    );
  }
}
