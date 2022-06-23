import React, { Component } from "react";
import { Container } from 'react-bootstrap';
import IngredientsListInsert from '../components/ingredientsListInsert';

import { IngredientProvider } from "../context/IngredientContext";

class Search extends Component {
  render() {
    return (
      <Container className="pt-4">
        <h2>Enter your ingredients below</h2>
        <IngredientProvider>
          <IngredientsListInsert />
        </IngredientProvider>
      </Container>
    );
  }
}

export default Search;