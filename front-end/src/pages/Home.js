import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdsCarousel from "../components/adsCarousel";
import LastRecipesContext from "../context/LastRecipesContext";
import RecipeCard from "../components/recipeCard";

import { LastRecipesProvider } from "../context/LastRecipesContext";

class Home extends Component {
  render() {
    return (
      <Container className="pt-4">
        <Row>
          <Col xs={12}>
            <AdsCarousel />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <h2 className="text-muted">Last added</h2>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <LastRecipesProvider>
              <LastRecipesContext.Consumer>
                {(recipes) =>
                  !recipes.fetching ? (
                    <RecipeCard.Container>
                      <RecipeCard.Objects recipes={recipes} />
                    </RecipeCard.Container>
                  ) : (
                    ""
                  )
                }
              </LastRecipesContext.Consumer>
            </LastRecipesProvider>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
