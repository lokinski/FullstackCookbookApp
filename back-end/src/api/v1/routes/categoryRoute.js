const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const { authorize } =  require('../../../middlewares');

router.post('/', authorize('admin'), categoryController.postCreateCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getSpecificCategory);
router.patch('/:id', authorize('admin'), categoryController.patchSpecificCategory);
router.delete('/:id', authorize('admin'), categoryController.deleteSpecificCategory);

module.exports = router;