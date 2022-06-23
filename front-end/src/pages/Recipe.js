import React, { Component } from "react";
import { Container, Alert } from "react-bootstrap";
import SpecificRecipeContext from "../context/SpecificRecipeContext";
import RecipeDisplay from "../components/recipeDisplay";

import { SpecificRecipeProvider } from "../context/SpecificRecipeContext";

class Recipe extends Component {
  render() {
    return (
      <Container className="pt-4">
        <SpecificRecipeProvider id={this.props.match.params.id}>
          <SpecificRecipeContext.Consumer>
            {(recipe) =>
              recipe.found && !recipe.fetching ? (
                <RecipeDisplay />
              ) : !recipe.fetching ? (
                <Alert variant="danger" style={{ width: "100%" }}>
                  No recipe found.
                </Alert>
              ) : (
                ""
              )
            }
          </SpecificRecipeContext.Consumer>
        </SpecificRecipeProvider>
      </Container>
    );
  }
}

export default Recipe;
