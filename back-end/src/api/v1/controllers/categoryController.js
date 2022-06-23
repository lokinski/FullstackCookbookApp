const categoryService = require('../services/categoryService');
const error = require('../../../utils/errorFormatter');
const categoryUpdateValidator = require('../../../validators/categoryUpdateValidator');
const categoryCreateValidator = require('../../../validators/categoryCreateValidator');

const postCreateCategory = async (req, res) => {
    const data = req.body;
    const validation = categoryCreateValidator(data);

    if (validation.error) {
        return res.status(400).json(error(validation.error));
    }

    try {
        const createdCategory = await categoryService.createCategory(data);

        return res.status(200).json(createdCategory);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

const getAllCategories = async (_, res) => {
    try {
        const categories = await categoryService.getAllCategories();

        return res.status(200).json(categories);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

const getSpecificCategory = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const category = await categoryService.getCategory(categoryId);

        return res.status(200).json(category);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

const patchSpecificCategory = async (req, res) => {
    const categoryId = req.params.id;
    const data = req.body;
    const validation = categoryUpdateValidator(data);

    if (validation.error) {
        return res.status(400).json(error(validation.error));
    }

    try {
        const category = await categoryService.updateCategory(categoryId, data);

        return res.status(200).json(category);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

const deleteSpecificCategory = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const category = await categoryService.removeCategory(categoryId);

        return res.status(200).json(category);
    } catch(err) {
        return res.status(404).json(error(err));
    }
};

module.exports = {
    postCreateCategory, getAllCategories, getSpecificCategory, patchSpecificCategory, deleteSpecificCategory
};