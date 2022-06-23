const recipeService = require('../services/recipeService');
const error = require('../../../utils/errorFormatter');
const recipeUpdateValidator = require('../../../validators/recipeUpdateValidator');
const recipeCreateValidator = require('../../../validators/recipeCreateValidator');

const postCreateRecipe = async (req, res) => {
    const data = req.body;
    const validation = recipeCreateValidator(data);

    if (validation.error) {
        return res.status(400).json(error(validation.error));
    }

    try {
        const createdRecipe = await recipeService.createRecipe(req.session.user_id, data);

        return res.status(200).json(createdRecipe);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

const getRecipes = async (req, res) => {
    try {
        const recipes = await recipeService.getRecipes(req.query);

        return res.status(200).json(recipes);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

const getSpecificRecipe = async (req, res) => {
    const recipeId = req.params.id;

    try {
        const recipe = await recipeService.getRecipe(recipeId);

        return res.status(200).json(recipe);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

const getLastRecipes = async (req, res) => {
    const amount = req.params.amount;

    try {
        const recipes = await recipeService.getLastRecipes(amount);

        return res.status(200).json(recipes);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

const patchSpecificRecipe = async (req, res) => {
    const recipeId = req.params.id;
    const data = req.body;
    const validation = recipeUpdateValidator(data);

    if (validation.error) {
        return res.status(400).json(error(validation.error));
    }

    try {
        const recipe = await recipeService.updateRecipe(recipeId, data);

        return res.status(200).json(recipe);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

const deleteSpecificRecipe = async (req, res) => {
    const recipeId = req.params.id;

    try {
        const recipe = await recipeService.removeRecipe(recipeId);

        return res.status(200).json(recipe);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

module.exports = {
    postCreateRecipe, getRecipes, getSpecificRecipe, getLastRecipes, patchSpecificRecipe, deleteSpecificRecipe
};