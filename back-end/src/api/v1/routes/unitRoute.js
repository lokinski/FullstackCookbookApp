const express = require('express');
const router = express.Router();

const unitController = require('../controllers/unitController');
const { authorize } =  require('../../../middlewares');

router.post('/', authorize('admin'), unitController.postCreateUnit);
router.get('/', unitController.getAllUnits);
router.get('/:id', unitController.getSpecificUnit);
router.patch('/:id', authorize('admin'), unitController.patchSpecificUnit);
router.delete('/:id', authorize('admin'), unitController.deleteSpecificUnit);

module.exports = router;