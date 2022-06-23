const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { notLoggedIn, authorize } =  require('../../../middlewares/');

router.post('/register', notLoggedIn, userController.postRegister);
router.post('/login', notLoggedIn, userController.postLogin);
router.post('/logout', authorize(), userController.postLogout);
router.get('/profile', authorize(), userController.getProfile);
router.get('/profile/:username', userController.getSpecificProfile);

module.exports = router;