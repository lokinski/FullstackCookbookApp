import React, { Component } from "react";
import { Pagination } from "react-bootstrap";
import RecipeContext from '../../../context/RecipeContext';
import '../styles/pagination.css';

export default class RecipeCardPagination extends Component {
  static contextType = RecipeContext;

  loadItems() {
    const recipes = this.context;
    let itemList = [];

    if (recipes.pages >= 5) {
      let start = recipes.page - 2;
      let end = recipes.page + 2;

      if (start < 1) {
        end += 1 - start;
        start = 1;
      }
      if (end > recipes.pages) {
        start -= end - recipes.pages;
        end = recipes.pages;
      }

      for (let i = start; i <= end; i++) {
        itemList.push(
          <Pagination.Item
            key={i}
            onClick={() => this.openPage(i)}
            active={i === recipes.page}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      for (let i = 1; i <= recipes.pages; i++) {
        itemList.push(
          <Pagination.Item
            key={i}
            onClick={() => this.openPage(i)}
            active={i === recipes.page}
          >
            {i}
          </Pagination.Item>
        );
      }
    }

    return itemList;
  }

  async openPage(page) {
    if (page) {
      const recipes = this.context;
      await recipes.changePage(page);
    }
  }

  render() {
    const items = this.loadItems();

    return (
      <Pagination className="justify-content-center">
        <Pagination.First onClick={() => this.openPage(1)} />
        <Pagination.Prev
          onClick={() => this.openPage(this.context.prevPage)}
          disabled={!this.context.hasPrevPage}
        />

        {items}

        <Pagination.Next
          onClick={() => this.openPage(this.context.nextPage)}
          disabled={!this.context.hasNextPage}
        />
        <Pagination.Last onClick={() => this.openPage(this.context.pages)} />
      </Pagination>
    );
  }
};
