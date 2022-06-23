const ingredientService = require('../services/ingredientService');
const error = require('../../../utils/errorFormatter');
const ingredientUpdateValidator = require('../../../validators/ingredientUpdateValidator');
const ingredientCreateValidator = require('../../../validators/ingredientCreateValidator');

const postCreateIngredient = async (req, res) => {
    const data = req.body;
    const validation = ingredientCreateValidator(data);

    if (validation.error) {
        return res.status(400).json(error(validation.error));
    }

    try {
        const createdIngredient = await ingredientService.createIngredient(data);

        return res.status(200).json(createdIngredient);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

const getAllIngredients = async (_, res) => {
    try {
        const ingredients = await ingredientService.getAllIngredients();

        return res.status(200).json(ingredients);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

const getSpecificIngredient = async (req, res) => {
    const ingredientId = req.params.id;

    try {
        const ingredient = await ingredientService.getIngredient(ingredientId);

        return res.status(200).json(ingredient);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

const patchSpecificIngredient = async (req, res) => {
    const ingredientId = req.params.id;
    const data = req.body;
    const validation = ingredientUpdateValidator(data);

    if (validation.error) {
        return res.status(400).json(error(validation.error));
    }

    try {
        const ingredient = await ingredientService.updateIngredient(ingredientId, data);

        return res.status(200).json(ingredient);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

const deleteSpecificIngredient = async (req, res) => {
    const ingredientId = req.params.id;

    try {
        const ingredient = await ingredientService.removeIngredient(ingredientId);

        return res.status(200).json(ingredient);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

module.exports = {
    postCreateIngredient, getAllIngredients, getSpecificIngredient, patchSpecificIngredient, deleteSpecificIngredient
};
