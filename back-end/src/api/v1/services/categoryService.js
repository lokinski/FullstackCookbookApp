const Category = require('../../../models/Category');
const sanitize = require('mongo-sanitize');

const createCategory = async (categoryData) => {
    const newCategory = new Category({
        name: sanitize(categoryData.name)
    });

    try {
        const category = await newCategory.save();

        return category;
    } catch(err) {
        throw err;
    }
};

const getAllCategories = async () => {
    try {
        const allCategories = await Category.find({});

        return allCategories;
    } catch(err) {
        throw err;
    }
};

const getCategory = async (id) => {
    const category = await Category.findById(sanitize(id));

    if (!category) {
        throw new Error('Could not find a category with that ID');
    }

    return category;
};

const updateCategory = async (id, data) => {
    const category = await Category.findById(sanitize(id));

    if (!category) {
        throw new Error('Could not find a category with that ID');
    }

    try {
        Object.assign(category, sanitize(data));
        const updatedCategory = await category.save();

        return updatedCategory;
    } catch(err) {
        throw err;
    }
};

const removeCategory = async (id) => {
    const category = await Category.findById(sanitize(id));

    if (!category) {
        throw new Error('Could not find a category with that ID');
    }

    try {
        await category.remove();

        return category;
    } catch(err) {
        throw err;
    }
};

module.exports = {
    createCategory, getAllCategories, getCategory, updateCategory, removeCategory
};