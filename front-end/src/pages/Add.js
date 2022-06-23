import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import AddRecipeForm from "../components/addRecipeForm";

import UserContext from "../context/UserContext";

import { RecipeProvider } from "../context/RecipeContext";
import { CategoryProvider } from "../context/CategoryContext";
import { CuisineProvider } from "../context/CuisineContext";
import IngredientContext, {
  IngredientProvider,
} from "../context/IngredientContext";
import UnitContext, { UnitProvider } from "../context/UnitContext";

class Add extends Component {
  render() {
    return (
      <Container>
        <RecipeProvider>
          <CategoryProvider>
            <CuisineProvider>
              <UnitProvider>
                <IngredientProvider>
                  <Row className="justify-content-center mt-4">
                    <Col xs={12} sm={12} md={10} lg={8} xl={8}>
                      <UserContext.Consumer>
                        {(user) => (
                          <UnitContext.Consumer>
                            {(units) => (
                              <IngredientContext.Consumer>
                                {(ingredients) => (
                                  <AddRecipeForm
                                    user={user}
                                    units={units}
                                    ingredients={ingredients}
                                  />
                                )}
                              </IngredientContext.Consumer>
                            )}
                          </UnitContext.Consumer>
                        )}
                      </UserContext.Consumer>
                    </Col>
                  </Row>
                </IngredientProvider>
              </UnitProvider>
            </CuisineProvider>
          </CategoryProvider>
        </RecipeProvider>
      </Container>
    );
  }
}

export default Add;
