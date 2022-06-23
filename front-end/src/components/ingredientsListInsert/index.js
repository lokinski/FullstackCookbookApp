import React, { Component } from "react";
import { ListGroup, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

import IngredientContext from "../../context/IngredientContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

class IngredientsListInsert extends Component {
  static contextType = IngredientContext;

  state = {
    currentIngredient: null,
    ingredients: [],
  };

  onIngredientChange(selected) {
    if (selected.length > 0) {
      this.setState({ currentIngredient: selected[0] });
    } else {
      this.setState({ currentIngredient: null });
    }
  }

  onIngredientAdd() {
    if (this.state.currentIngredient !== null) {
      this.setState({
        ingredients: [...this.state.ingredients, this.state.currentIngredient],
      });
    }
  }

  generateIngredientsArgument() {
    let ingredients = [];
    for (let ingredient of this.state.ingredients) {
      ingredients.push(ingredient.value);
    }

    return ingredients.join(',');
  }

  render() {
    const ingredients = this.context;

    return (
      <>
        <Row className="mb-2">
          <Col sm={10}>
            <Typeahead
              id="ingredient-name"
              placeholder="Ingredient name..."
              onChange={this.onIngredientChange.bind(this)}
              options={ingredients.optionsData}
              className="mb-2"
            />
          </Col>
          <Col sm={2}>
            <Button
              onClick={this.onIngredientAdd.bind(this)}
              variant="success"
              block
            >
              <FontAwesomeIcon icon={faPlusSquare} />
            </Button>
          </Col>
        </Row>
        {this.state.ingredients.length > 0 ? (
          <ListGroup variant="flush">
            {this.state.ingredients.map((ingredient, i) => (
              <ListGroup.Item key={i}>{ingredient.label}</ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          ""
        )}
        <LinkContainer to={`/recipes?ingredients=${this.generateIngredientsArgument()}`}>
          <Button className="mt-2" variant="info" block>
            Search for recipes
          </Button>
        </LinkContainer>
      </>
    );
  }
}

export default IngredientsListInsert;
