const express = require('express');
const router = express.Router();

const ingredientController = require('../controllers/ingredientController');
const { authorize } =  require('../../../middlewares');

router.post('/', authorize('admin'), ingredientController.postCreateIngredient);
router.get('/', ingredientController.getAllIngredients);
router.get('/:id', ingredientController.getSpecificIngredient);
router.patch('/:id', authorize('admin'), ingredientController.patchSpecificIngredient);
router.delete('/:id', authorize('admin'), ingredientController.deleteSpecificIngredient);

module.exports = router;