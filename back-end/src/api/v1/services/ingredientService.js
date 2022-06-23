const Ingredient = require('../../../models/Ingredient');
const sanitize = require('mongo-sanitize');

const createIngredient = async (ingredientData) => {
    const newIngredient = new Ingredient({
        name: sanitize(ingredientData.name)
    });

    try {
        const ingredient = await newIngredient.save();

        return ingredient;
    } catch(err) {
        throw err;
    }
};

const getAllIngredients = async () => {
    try {
        const allIngredients = await Ingredient.find({});

        return allIngredients;
    } catch(err) {
        throw err;
    }
};

const getIngredient = async (id) => {
    const ingredient = await Ingredient.findById(sanitize(id));

    if (!ingredient) {
        throw new Error('Could not find an ingredient with that ID');
    }

    return ingredient;
};

const updateIngredient = async (id, data) => {
    const ingredient = await Ingredient.findById(sanitize(id));

    if (!ingredient) {
        throw new Error('Could not find an ingredient with that ID');
    }

    try {
        Object.assign(ingredient, sanitize(data));
        const updatedIngredient = await ingredient.save();

        return updatedIngredient;
    } catch(err) {
        throw err;
    }
};

const removeIngredient = async (id) => {
    const ingredient = await Ingredient.findById(sanitize(id));

    if (!ingredient) {
        throw new Error('Could not find an ingredient with that ID');
    }

    try {
        await ingredient.remove();

        return ingredient;
    } catch(err) {
        throw err;
    }
};

module.exports = {
    createIngredient, getAllIngredients, getIngredient, updateIngredient, removeIngredient
};