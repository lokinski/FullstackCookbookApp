const express = require('express');
const router = express.Router();

const cuisineController = require('../controllers/cuisineController');
const { authorize } =  require('../../../middlewares');

router.post('/', authorize('admin'), cuisineController.postCreateCuisine);
router.get('/', cuisineController.getAllCuisines);
router.get('/:id', cuisineController.getSpecificCuisine);
router.patch('/:id', authorize('admin'), cuisineController.patchSpecificCuisine);
router.delete('/:id', authorize('admin'), cuisineController.deleteSpecificCuisine);

module.exports = router;