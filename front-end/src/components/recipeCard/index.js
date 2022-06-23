import React, { Component } from "react";
import { Card, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Container } from "./styles/recipeCard.js";
import RecipeCardPagination from "./components/pagination";
import RecipeCardFilters from "./components/filters";
import RecipeCardObjects from "./components/objects";
import "./styles/recipeCard.css";

class RecipeCard extends Component {
  render() {
    return (
      <LinkContainer to={`/recipes/${this.props.id || ""}`}>
        <Card
          style={{ width: "19rem" }}
          className={`recipe-card h-100 ${this.props.styleName} ${this.props.variant}`}
        >
          <Card.Img
            variant="top"
            src={window.location.origin + "/img/sample_recipe.png"}
          />
          <Card.Body>
            <Card.Title>{this.props.recipe?.name}</Card.Title>
            <Badge variant="warning">
              {this.props.recipe?.category?.name}
            </Badge>{" "}
            {this.props.recipe?.vegan ? (
              <Badge variant="warning">vegan</Badge>
            ) : this.props.recipe?.vegetarian ? (
              <Badge variant="warning">vegetarian</Badge>
            ) : (
              ""
            )}
            {this.props.recipe?.missingIngredients ? (
              <Badge variant="danger" className="ml-1">Missing ingredients: {this.props.recipe.missingIngredients}</Badge>
            ) : ""}
          </Card.Body>
          <Card.Footer className="text-muted">
            {this.props.recipe?.cuisine?.name} cuisine
          </Card.Footer>
        </Card>
      </LinkContainer>
    );
  }
}

RecipeCard.Container = class RecipeCardContainer extends Component {
  render() {
    return (
      <Container direction={this.props.direction || "row"}>
        {this.props.children}
      </Container>
    );
  }
};

RecipeCard.Filters = RecipeCardFilters;
RecipeCard.Pagination = RecipeCardPagination;
RecipeCard.Objects = RecipeCardObjects;

export default RecipeCard;
