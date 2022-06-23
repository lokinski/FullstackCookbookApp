const cuisineService = require('../services/cuisineService');
const error = require('../../../utils/errorFormatter');
const cuisineUpdateValidator = require('../../../validators/cuisineUpdateValidator');
const cuisineCreateValidator = require('../../../validators/cuisineCreateValidator');

const postCreateCuisine = async (req, res) => {
    const data = req.body;
    const validation = cuisineCreateValidator(data);

    if (validation.error) {
        return res.status(400).json(error(validation.error));
    }

    try {
        const createdCuisine = await cuisineService.createCuisine(data);

        return res.status(200).json(createdCuisine);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

const getAllCuisines = async (_, res) => {
    try {
        const cuisines = await cuisineService.getAllCuisines();

        return res.status(200).json(cuisines);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

const getSpecificCuisine = async (req, res) => {
    const cuisineId = req.params.id;

    try {
        const cuisine = await cuisineService.getCuisine(cuisineId);

        return res.status(200).json(cuisine);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

const patchSpecificCuisine = async (req, res) => {
    const cuisineId = req.params.id;
    const data = req.body;
    const validation = cuisineUpdateValidator(data);

    if (validation.error) {
        return res.status(400).json(error(validation.error));
    }

    try {
        const cuisine = await cuisineService.updateCuisine(cuisineId, data);

        return res.status(200).json(cuisine);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

const deleteSpecificCuisine = async (req, res) => {
    const cuisineId = req.params.id;

    try {
        const cuisine = await cuisineService.removeCuisine(cuisineId);

        return res.status(200).json(cuisine);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

module.exports = {
    postCreateCuisine, getAllCuisines, getSpecificCuisine, patchSpecificCuisine, deleteSpecificCuisine
};