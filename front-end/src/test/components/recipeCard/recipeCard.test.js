import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from 'react-router-dom';

import RecipeCard from "../../../components/recipeCard";

let testContainer = null;

beforeEach(() => {
    testContainer = document.createElement('div');
    document.body.appendChild(testContainer);
});

afterEach(() => {
    unmountComponentAtNode(testContainer);
    testContainer.remove();
});

it("Vegan and vegetarian variants", () => {
    act(() => {
        const recipe = {
            vegetarian: true
        };
        render((
            <Router>
                <RecipeCard recipe={recipe} />
            </Router>
        ), testContainer);
    });
    expect(testContainer.textContent).toContain('vegetarian');

    act(() => {
        const recipe = {
            vegan: true
        };
        render((
            <Router>
                <RecipeCard recipe={recipe} />
            </Router>
        ), testContainer);
    });
    expect(testContainer.textContent).toContain('vegan');
});