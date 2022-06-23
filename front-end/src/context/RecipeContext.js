import React, { Component } from "react";
import API from "../api";
import NProgress from "nprogress";

const RecipeContext = React.createContext();

export class RecipeProvider extends Component {
  state = {
    data: [],
    page: 1,
    pages: 1,
    recipesCount: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
    errors: [],
    fetching: true,
    filters: {},
  };

  changePage = async (newPage) => {
    if (newPage > 0 && newPage <= this.state.pages) {
      await this.fetchRecipes(newPage, this.state.filters);
    }
  };

  setFilters = async (newFilters) => {
    await this.fetchRecipes(1, newFilters);
  };

  create = async (name, category, cuisine, vegetarian, vegan, ingredients, steps, tags) => {
    const data = {
      name: name,
      category: category,
      cuisine: cuisine,
      vegetarian: vegetarian,
      vegan: vegan,
      ingredients: this.convertIngredients(ingredients),
      steps: steps,
      tags: this.converTags(tags),
    };

    try {
      const response = await API.post("recipes", data);

      return { id: response.data._id };
    } catch (err) {
      return {
        errors: err.response?.data?.errors || ["Unknown error"],
      };
    }
  };

  convertIngredients(ingredients) {
    let result = [];
    for (let ingredient of ingredients) {
      result.push({
        ingredient: ingredient.ingredient.value,
        unit: ingredient.unit.value,
        count: parseInt(ingredient.amount) || ingredient.amount,
      });
    }

    return result;
  }

  converTags(tags) {
    if (tags.length === 0) return [];
    let result = [];
    for (let tag of tags.split(',')) {
      result.push(tag.trim());
    }

    return result;
  }

  generateFiltersArguments(filters) {
    const args = [];
    for (const [filter, value] of Object.entries(filters)) {
      if (typeof value === "string" && !value) continue;
      args.push(`${encodeURIComponent(filter)}=${encodeURIComponent(value)}`);
    }

    return args.length === 0 ? "" : "&" + args.join("&");
  }

  getIngredientsFromParams() {
    if (!this.props.location) return [];

    const urlParams = new URLSearchParams(this.props.location.search);
    if (urlParams.get('ingredients')) return urlParams.get('ingredients').split(',');

    return [];
  }

  getMissingIngredients(recipe, ingredients) {
    let missing = 0;
    for (let ingredient of recipe.ingredients) {
      if (!ingredients.includes(ingredient.ingredient._id)) {
        missing++;
      }
    }

    recipe.missingIngredients = missing;
    return missing;
  }

  sortIngredients(list) {
    const ingredients = this.getIngredientsFromParams();
    if (ingredients.length > 0) {
      list.sort((a, b) => this.getMissingIngredients(a, ingredients) - this.getMissingIngredients(b, ingredients));
    }
  }

  generateIngredientsFromParams() {
    if (!this.props.location) return '';
    
    const urlParams = new URLSearchParams(this.props.location.search);
    if (urlParams.get('ingredients')) {
      return `&ingredients=${urlParams.get('ingredients')}`;
    }

    return '';
  }

  async fetchRecipes(page, filters = {}) {
    NProgress.start();
    const url = `recipes?page=${page}${this.generateFiltersArguments(filters)}${this.generateIngredientsFromParams()}`;
    this.setState({ fetching: true });
    try {
      const response = await API.get(url);

      this.sortIngredients(response.data.docs);

      this.setState({
        data: response.data.docs,
        page: response.data.page,
        pages: response.data.totalPages,
        recipesCount: response.data.totalDocs,
        hasPrevPage: response.data.hasPrevPage,
        hasNextPage: response.data.hasNextPage,
        prevPage: response.data.prevPage,
        nextPage: response.data.nextPage,
        fetching: false,
        filters: filters,
      });

      NProgress.done();
    } catch (err) {
      this.setState({
        errors: err.response?.data?.errors || ["Unknown error"],
        fetching: false,
      });

      NProgress.done();
    }
  }

  componentDidMount() {
    this.fetchRecipes(this.state.page);
  }

  render() {
    const { changePage, setFilters, create } = this;
    const {
      data,
      page,
      pages,
      recipesCount,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      errors,
      fetching,
    } = this.state;

    return (
      <RecipeContext.Provider
        value={{
          data,
          page,
          pages,
          recipesCount,
          hasPrevPage,
          hasNextPage,
          prevPage,
          nextPage,
          errors,
          fetching,
          changePage,
          setFilters,
          create,
        }}
      >
        {this.props.children}
      </RecipeContext.Provider>
    );
  }
}

export default RecipeContext;
