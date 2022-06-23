import React, { Component } from "react";
import { Form, Col, Button, Alert, Breadcrumb, Table } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { Redirect } from "react-router-dom";

import RecipeContext from "../../context/RecipeContext";
import CategoryContext from "../../context/CategoryContext";
import CuisineContext from "../../context/CuisineContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

class AddRecipeForm extends Component {
  static contextType = RecipeContext;

  state = {
    errors: [],
    vegetarianCheck: false,
    veganCheck: false,
    currentIngredient: null,
    currentUnit: null,
    currentAmount: 1,
    currentStep: "",
    ingredients: [],
    steps: [],
    duringSubmit: false,
    redirect: false,
    redirectTo: "/",
  };

  async submitForm(event) {
    event.preventDefault();

    if (this.state.steps.length === 0) {
      this.setState({ errors: ['No steps was provided'] });
      return;
    }
    if (this.state.ingredients.length === 0) {
      this.setState({ errors: ['No ingredients was provided'] });
      return;
    }

    this.setState({ duringSubmit: true });

    const formElements = event.target.elements;

    const name = formElements.name.value;
    const category = formElements.category.value;
    const cuisine = formElements.cuisine.value;
    const vegetarian = this.state.vegetarianCheck;
    const vegan = this.state.veganCheck;
    const ingredients = this.state.ingredients;
    const steps = this.state.steps;
    const tags = formElements.tags.value;

    if (name.length === 0) {
      this.setState({ errors: ['No name was provided'] });
      return;
    }
    if (category.length === 0) {
      this.setState({ errors: ['No category was provided'] });
      return;
    }
    if (cuisine.length === 0) {
      this.setState({ errors: ['No cousine was provided'] });
      return;
    }

    const recipes = this.context;

    const result = await recipes.create(name, category, cuisine, vegetarian, vegan, ingredients, steps, tags);
    if (result.errors) {
      this.setState({ errors: result.errors, duringSubmit: false });
      return;
    }

    this.setState({ redirectTo: `/recipes/${result.id}`, redirect: true });
  }

  onVegetarianSwitchChange(event) {
    const checked = event.target.checked;

    this.setState({ vegetarianCheck: checked });
  }

  onVeganSwitchChange(event) {
    const checked = event.target.checked;

    this.setState({ veganCheck: checked });
  }

  onIngredientChange(selected) {
    if (selected.length > 0) {
      this.setState({ currentIngredient: selected[0] });
    } else {
      this.setState({ currentIngredient: null });
    }
  }

  onAmountChange(event) {
    this.setState({ currentAmount: event.target.value });
  }

  onUnitChange(selected) {
    if (selected.length > 0) {
      this.setState({ currentUnit: selected[0] });
    } else {
      this.setState({ currentUnit: null });
    }
  }

  onIngredientAdd() {
    if (this.state.currentIngredient !== null && this.state.currentUnit !== null) {
      if (!parseInt(this.state.currentAmount)) {
        this.setState({ errors: ['Amount should be a number'] });
        return;
      }
      this.setState({
        ingredients: [...this.state.ingredients, {
          ingredient: this.state.currentIngredient,
          amount: this.state.currentAmount,
          unit: this.state.currentUnit
        }],
        errors: []
      });
    }
  }

  onStepChange(event) {
    this.setState({ currentStep: event.target.value });
  }

  onStepAdd() {
    if (this.state.currentStep.length > 0) {
      this.setState({ steps: [...this.state.steps, this.state.currentStep] });
    }
  }

  render() {
    const user = this.props.user;

    if (this.state.redirect || (!user.isLoggedIn && user.fetched)) {
      return <Redirect to={this.state.redirectTo} />;
    }

    return (
      <Form
        onSubmit={this.submitForm.bind(this)}
        style={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          padding: "15px",
        }}
        className="mb-4"
      >
        {this.state.errors.map((error, id) => (
          <Alert key={id} variant="danger">
            {error}
          </Alert>
        ))}
        <Breadcrumb>
          <Breadcrumb.Item active>Basic informations</Breadcrumb.Item>
        </Breadcrumb>
        <Form.Row>
          <Form.Group as={Col} controlId="name">
            <Form.Label>Recipe name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Recipe name..."
            />
            <Form.Text className="text-muted">
              The name of the recipe. (1-128 characters long)
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
            <Form.Text className="text-muted">
              Is the recipe vegetarian?
            </Form.Text>
          </Form.Group>
          <Form.Group as={Col} controlId="vegan">
            <Form.Label>Vegan</Form.Label>
            <Form.Check
              checked={this.state.veganCheck}
              onChange={this.onVeganSwitchChange.bind(this)}
              type="switch"
              id="vegan"
            />
            <Form.Text className="text-muted">
              Is the recipe vegan?
            </Form.Text>
          </Form.Group>
        </Form.Row>
        <Breadcrumb>
          <Breadcrumb.Item active>Ingredients</Breadcrumb.Item>
        </Breadcrumb>
        <Form.Row>
          <Col xs={12} sm={5} className="mb-1">
            <Typeahead
              id="ingredient-name"
              placeholder="Ingredient name..."
              onChange={this.onIngredientChange.bind(this)}
              options={this.props.ingredients.optionsData}
            />
          </Col>
          <Col sm={2} className="mb-2">
            <Form.Control
              onChange={this.onAmountChange.bind(this)}
              type="text"
              placeholder="Amount..."
            />
          </Col>
          <Col xs={12} sm={3} className="mb-1">
            <Typeahead
              id="ingredient-unit"
              placeholder="Unit..."
              onChange={this.onUnitChange.bind(this)}
              options={this.props.units.optionsData}
            />
          </Col>
          <Col sm={2} className="mb-2">
            <Button
              onClick={this.onIngredientAdd.bind(this)}
              variant="success"
              block
            >
              <FontAwesomeIcon icon={faPlusSquare} />
            </Button>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            {this.state.ingredients.length > 0 ? (
              <Table borderless striped size="sm">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.ingredients.map((ingredient, i) => (
                    <tr key={i}>
                      <td>{ingredient.ingredient.label}</td>
                      <td>
                        {ingredient.amount} {ingredient.unit.label}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Alert variant="danger">No ingredients was provided.</Alert>
            )}
          </Col>
        </Form.Row>
        <Breadcrumb>
          <Breadcrumb.Item active>Steps</Breadcrumb.Item>
        </Breadcrumb>
        
        <Form.Row>
          <Col sm={10} className="mb-2">
            <Form.Control
              onChange={this.onStepChange.bind(this)}
              type="text"
              placeholder="Step description..."
            />
          </Col>
          <Col sm={2} className="mb-2">
            <Button
              onClick={this.onStepAdd.bind(this)}
              variant="success"
              block
            >
              <FontAwesomeIcon icon={faPlusSquare} />
            </Button>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            {this.state.steps.length > 0 ? (
              <Table borderless striped size="sm">
                <tbody>
                  {this.state.steps.map((step, i) => (
                    <tr key={i}>
                      <td style={{'width': '15px'}}>{i+1}</td>
                      <td>
                        {step}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Alert variant="danger">No steps was provided.</Alert>
            )}
          </Col>
        </Form.Row>

        <Breadcrumb>
          <Breadcrumb.Item active>Tags</Breadcrumb.Item>
        </Breadcrumb>
        <Form.Row>
          <Form.Group as={Col} controlId="tags">
            <Form.Control
              type="text"
              placeholder="Enter tags after the decimal point..."
            />
            <Form.Text className="text-muted">
              Example: ramen, tortilla
            </Form.Text>
          </Form.Group>
        </Form.Row>
        <Button
          variant="danger"
          type="submit"
          disabled={this.state.duringSubmit}
          block
        >
          Add recipe
        </Button>
      </Form>
    );
  }
}

export default AddRecipeForm;