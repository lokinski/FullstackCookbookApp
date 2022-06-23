const express = require('express');
const router = express.Router();

const userRoute = require('./routes/userRoute');
const recipeRoute = require('./routes/recipeRoute');
const unitRoute = require('./routes/unitRoute');
const categoryRoute = require('./routes/categoryRoute');
const cuisineRoute = require('./routes/cuisineRoute');
const ingredientRoute = require('./routes/ingredientRoute');

router.use('/users', userRoute);
router.use('/recipes', recipeRoute);
router.use('/units', unitRoute);
router.use('/categories', categoryRoute);
router.use('/cuisines', cuisineRoute);
router.use('/ingredients', ingredientRoute);

module.exports = router;