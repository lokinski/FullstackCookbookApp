const Recipe = require('../../../models/Recipe');
const sanitize = require('mongo-sanitize');
const populateRecipe = require('../../../utils/populateRecipe');

const createRecipe = async (userId, recipeData) => {
    recipeData = sanitize(recipeData);

    const newRecipe = await new Recipe({
        name: recipeData.name,
        ingredients: recipeData.ingredients,
        steps: recipeData.steps,
        category: recipeData.category,
        cuisine: recipeData.cuisine,
        tags: recipeData.tags,
        vegetarian: recipeData.vegetarian,
        vegan: recipeData.vegan,
        addedBy: userId
    });

    try {
        const recipe = await newRecipe.save();

        return populateRecipe(recipe)
    } catch(err) {
        throw err;
    }
};

const getRecipes = async (filters) => {
    const page = parseInt(filters['page']) || 1;

    const name = sanitize(filters['name'] || '');
    const category = sanitize(filters['category'] || '');
    const cuisine = sanitize(filters['cuisine'] || '');
    const vegetarian = sanitize(filters['vegetarian'] === 'true' ? true : false);
    const vegan = sanitize(filters['vegan'] === 'true' ? true : false);
    const ingredients = filters['ingredients'] ? sanitize(filters['ingredients'].split(',')) : '';
 
    const filterQuery = {};
    if (name.length > 0) filterQuery['name'] = {
        '$regex': name,
        '$options': 'i'
    };

    if (category.length > 0) filterQuery['category'] = category;
    if (cuisine.length > 0) filterQuery['cuisine'] = cuisine;

    if (vegetarian && vegan) {
        filterQuery['$or'] = [{'vegetarian': true}, {'vegan': true}];
    } else {
        if (vegetarian) filterQuery['vegetarian'] = vegetarian;
        if (vegan) filterQuery['vegan'] = vegan;
    }

    if (ingredients.length > 0) {
        filterQuery['ingredients.ingredient'] = {
            "$all": ingredients,
        };
    }

    const elementsPerPage = 6;
    let paginationOptions = {
        page: page,
        limit: elementsPerPage,
        populate: [
            { path: "addedBy", select: { _id: 0,  username: 1 } },
            { path: "ingredients.ingredient", select: { name: 1 } },
            { path: "ingredients.unit", select: { name: 1, shortcut: 1 } },
            { path: "category", select: { name: 1 } },
            { path: "cuisine", select: { name: 1 } }
        ]
    };

    if (ingredients.length > 0) {
        paginationOptions.sort = {
            'ingredientsCount': 1
        };
    }

    try {
        const recipes = await Recipe.paginate(filterQuery, paginationOptions);

        return recipes;
    } catch(err) {
        throw err;
    }
}

const getRecipe = async (id) => {
    const recipe = await Recipe.findById(sanitize(id));

    if (!recipe) {
        throw new Error('Could not find a recipe with that ID');
    }

    return populateRecipe(recipe);
};

const getLastRecipes = async (amount) => {
    amount = parseInt(amount) || 3;
    if (amount > 3 || amount < 1) amount = 3;
    try {
        const recipes = await populateRecipe(Recipe.find({}).sort('-createdAt').limit(amount), false);

        return recipes;
    } catch(err) {
        throw err;
    }
};

const updateRecipe = async (id, data) => {
    const recipe = await Recipe.findById(sanitize(id));

    if (!recipe) {
        throw new Error('Could not find a recipe with that ID');
    }

    try {
        Object.assign(recipe, sanitize(data));
        const updatedRecipe = await recipe.save();

        return updatedRecipe;
    } catch(err) {
        throw err;
    }
};

const removeRecipe = async (id) => {
    const recipe = await Recipe.findById(sanitize(id));

    if (!recipe) {
        throw new Error('Could not find a recipe with that ID');
    }

    try {
        await recipe.remove();

        return populateRecipe(recipe)
    } catch(err) {
        throw err;
    }
};

module.exports = {
    createRecipe, getRecipes, getRecipe, getLastRecipes, updateRecipe, removeRecipe
};