const express = require('express');
const router = express.Router();

const recipeController = require('../controllers/recipeController');
const { authorize } = require('../../../middlewares');

router.post('/', authorize(), recipeController.postCreateRecipe);
router.get('/', recipeController.getRecipes);
router.get('/:id', recipeController.getSpecificRecipe);
router.get('/last/:amount', recipeController.getLastRecipes);
router.patch('/:id', authorize('admin'), recipeController.patchSpecificRecipe);
router.delete('/:id', authorize('admin'), recipeController.deleteSpecificRecipe);

module.exports = router;