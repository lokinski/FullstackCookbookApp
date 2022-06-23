import React, { Component } from "react";
import { Container } from 'react-bootstrap';
import RecipeCard from '../components/recipeCard';
import RecipeContext from '../context/RecipeContext';

import { RecipeProvider } from '../context/RecipeContext';
import { CategoryProvider } from '../context/CategoryContext';
import { CuisineProvider } from '../context/CuisineContext';

class Recipes extends Component {
  render() {
    return (
      <Container className="pt-4">
        <RecipeProvider location={this.props.location}>
          <CategoryProvider>
            <CuisineProvider>
              <RecipeCard.Filters />
            </CuisineProvider>
          </CategoryProvider>
          <RecipeCard.Container>
            <RecipeContext.Consumer>
              {(recipes) => (
                <RecipeCard.Objects recipes={recipes} />
              )}
            </RecipeContext.Consumer>
          </RecipeCard.Container>
          <RecipeCard.Pagination />
        </RecipeProvider>
      </Container>
    );
  }
}

export default Recipes;
