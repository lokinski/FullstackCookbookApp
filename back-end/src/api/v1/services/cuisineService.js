const Cuisine = require('../../../models/Cuisine');
const sanitize = require('mongo-sanitize');

const createCuisine = async (data) => {
    const newCuisine = new Cuisine({
        name: sanitize(data.name)
    });

    try {
        const cuisine = await newCuisine.save();

        return cuisine;
    } catch(err) {
        throw err;
    }
};

const getAllCuisines = async () => {
    try {
        const allCuisines = await Cuisine.find({});

        return allCuisines;
    } catch(err) {
        throw err;
    }
};

const getCuisine = async (id) => {
    const cuisine = await Cuisine.findById(sanitize(id));

    if (!cuisine) {
        throw new Error('Could not find a cuisine with that ID');
    }

    return cuisine;
};

const updateCuisine = async (id, data) => {
    const cuisine = await Cuisine.findById(sanitize(id));

    if (!cuisine) {
        throw new Error('Could not find a cuisine with that ID');
    }

    try {
        Object.assign(cuisine, sanitize(data));
        const updatedCuisine = await cuisine.save();

        return updatedCuisine;
    } catch(err) {
        throw err;
    }
};

const removeCuisine = async (id) => {
    const cuisine = await Cuisine.findById(sanitize(id));

    if (!cuisine) {
        throw new Error('Could not find a cuisine with that ID');
    }

    try {
        await cuisine.remove();

        return cuisine;
    } catch(err) {
        throw err;
    }
};

module.exports = {
    createCuisine, getAllCuisines, getCuisine, updateCuisine, removeCuisine
};