import React, { Component } from "react";
import { Row, Col, Image, Table, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import SpecificRecipeContext from "../../context/SpecificRecipeContext";

class RecipeDisplay extends Component {
  static contextType = SpecificRecipeContext;

  render() {
    const recipe = this.context;
    const date = new Date(recipe.data.createdAt).toLocaleString();

    return (
      <>
        <Row>
          <Col>
            <Image
              src={window.location.origin + "/img/sample_recipe.png"}
              style={{ width: "100%" }}
              rounded
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col xs={12}>
            <h1>{recipe.data.name}</h1>
          </Col>
          <Col xs={12}>
            <h4>
              <Badge variant="warning" className="mr-2">
                {recipe.data.category.name}
              </Badge>
              {recipe.data.vegetarian ? (
                <Badge variant="warning" className="mr-2">
                  vegetarian
                </Badge>
              ) : (
                ""
              )}
              {recipe.data.vegan ? (
                <Badge variant="warning" className="mr-2">
                  vegan
                </Badge>
              ) : (
                ""
              )}
            </h4>
          </Col>
          <Col xs={12}>
            <h5 className="text-muted">{recipe.data.cuisine.name} cuisine</h5>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <h4>Ingredients</h4>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Table striped>
              <tbody>
                {recipe.data.ingredients.map((ingredient) => (
                  <tr>
                    <td style={{ width: '50%' }}>{ingredient.ingredient.name}</td>
                    <td>{ingredient.count} {ingredient.unit.shortcut}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <h4>Steps</h4>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Table striped>
              <tbody>
                {recipe.data.steps.map((step, i) => (
                  <tr>
                    <td style={{ width: "15px" }}>{i + 1}.</td>
                    <td>{step}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="mt-2 mb-4">
          <Col>
            <h5 className="text-muted text-right">
              Author:{" "}
              {
                <LinkContainer to={`/profile/${recipe.data.addedBy.username}`}>
                  <a href={`/profile/${recipe.data.addedBy.username}`}>
                    {recipe.data.addedBy.username}
                  </a>
                </LinkContainer>
              }
            </h5>
            <h5 className="text-muted text-right">Published: {date}</h5>
            <h6 className="text-muted text-right">
              Tags:{" "}
              {recipe.data.tags.length > 0 ? recipe.data.tags.join(", ") : "-"}
            </h6>
          </Col>
        </Row>
      </>
    );
  }
}

export default RecipeDisplay;
