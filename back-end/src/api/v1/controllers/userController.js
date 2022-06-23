const userService = require('../services/userService');
const error = require('../../../utils/errorFormatter');
const userCreateValidator = require('../../../validators/userCreateValidator');
const userLoginValidator = require('../../../validators/userLoginValidator');

const postRegister = async (req, res) => {
    const data = req.body;
    const validation = userCreateValidator(data);

    if (validation.error) {
        return res.status(400).json(error(validation.error));
    }

    try {
        await userService.createUser(data);

        return res.sendStatus(201);
    } catch(err) {
        return res.status(400).json(error(err));
    }
};

const postLogin = async (req, res) => {
    const data = req.body;
    const validation = userLoginValidator(data);

    if (validation.error) {
        return res.status(400).json(error(validation.error));
    }

    try {
        const user = await userService.loginUser(data);
        req.session.user_id = user._id;
        
        return res.status(200).json(user);
    } catch(err) {
        return res.status(403).json(error(err));
    }
};

const postLogout = async (req, res) => {
    try {
        await userService.logoutUser(req.session);
        
        return res.status(200).send('Logged out');
    } catch(err) {
        return res.status(400).json(error(err));
    }
};

const getProfile = async (req, res) => {
    try {
        const profile = await userService.getProfile(req.session);
        
        return res.status(200).json(profile)
    } catch(err) {
        return res.status(400).json(error(err));
    }
};

const getSpecificProfile = async (req, res) => {
    const profileUsername = req.params.username;
    try {
        const profile = await userService.getSpecificProfile(profileUsername);
        
        return res.status(200).json(profile)
    } catch(err) {
        return res.status(400).json(error(err));
    }
};

module.exports = {
    postRegister, postLogin, postLogout, getProfile, getSpecificProfile
};