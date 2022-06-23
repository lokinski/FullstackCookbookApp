import React, { Component } from "react";
import { Button, Card, Accordion, Col, Form } from "react-bootstrap";
import RecipeContext from "../../../context/RecipeContext";
import CategoryContext from "../../../context/CategoryContext";
import CuisineContext from "../../../context/CuisineContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareDown } from "@fortawesome/free-solid-svg-icons";

export default class RecipeCardFilters extends Component {
  static contextType = RecipeContext;

  state = {
    vegetarianCheck: false,
    veganCheck: false,
  };

  async submitForm(event) {
    event.preventDefault();

    const formElements = event.target.elements;
    const name = formElements.name.value;
    const category = formElements.category.value;
    const cuisine = formElements.cuisine.value;
    const vegetarian = this.state.vegetarianCheck;
    const vegan = this.state.veganCheck;

    await this.context.setFilters({
      name: name,
      category: category,
      cuisine: cuisine,
      vegetarian: vegetarian,
      vegan: vegan,
    });
  }

  onVegetarianSwitchChange(event) {
    const checked = event.target.checked;

    this.setState({ vegetarianCheck: checked });
  }

  onVeganSwitchChange(event) {
    const checked = event.target.checked;

    this.setState({ veganCheck: checked });
  }

  render() {
    return (
      <Accordion className="mb-4">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              <FontAwesomeIcon
                icon={faCaretSquareDown}
                size="lg"
                className="mr-1"
              />{" "}
              Filters list
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Form onSubmit={this.submitForm.bind(this)}>
                <Form.Row>
                  <Form.Group as={Col} controlId="name">
                    <Form.Label>Recipe name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name..." />
                    <Form.Text className="text-muted">
                      Name or part of the name of the recipe you are looking for.
                    </Form.Text>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control as="select" defaultValue="Select...">
                      <option value="">Select...</option>
                      <CategoryContext.Consumer>
                        {(categories) =>
                          categories.data.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))
                        }
                      </CategoryContext.Consumer>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} controlId="cuisine">
                    <Form.Label>Cuisine</Form.Label>
                    <Form.Control as="select" defaultValue="Select...">
                      <option value="">Select...</option>
                      <CuisineContext.Consumer>
                        {(cuisines) =>
                          cuisines.data.map((cuisine) => (
                            <option key={cuisine._id} value={cuisine._id}>
                              {cuisine.name}
                            </option>
                          ))
                        }
                      </CuisineContext.Consumer>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="vegetarian">
                    <Form.Label>Vegetarian</Form.Label>
                    <Form.Check
                      checked={this.state.vegetarianCheck}
                      onChange={this.onVegetarianSwitchChange.bind(this)}
                      type="switch"
                      id="vegetarian"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="vegan">
                    <Form.Label>Vegan</Form.Label>
                    <Form.Check
                      checked={this.state.veganCheck}
                      onChange={this.onVeganSwitchChange.bind(this)}
                      type="switch"
                      id="vegan"
                    />
                  </Form.Group>
                </Form.Row>

                <Button type="submit" variant="info" block>
                  Filter
                </Button>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}
