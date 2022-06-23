const bcrypt = require('bcryptjs');
const User = require('../../../models/User');
const Recipe = require('../../../models/Recipe');
const sanitize = require('mongo-sanitize');
const populateRecipe = require('../../../utils/populateRecipe');

const createUser = async (userData) => {
    userData = sanitize(userData);

    const newUser = new User({
        username: userData.username,
        password: userData.password,
        email: userData.email
    });

    try {
        const user = await newUser.save();

        return {
            "_id": user._id,
            username: user.username,
            email: user.email,
            roles: user.roles
        };
    } catch(err) {
        throw err;
    }
};

const loginUser = async (loginData) => {
    loginData = sanitize(loginData);
    
    const user = await User.findOne({ email: loginData.email });
    if (!user) {
        throw new Error('Could not find an account with that email');
    }

    const validatePassword = await bcrypt.compare(loginData.password, user.password);
    if (!validatePassword) {
        throw new Error('Wrong password');
    }

    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles
    };
};

const logoutUser = async (session) => {
    session.destroy((err) => {
        if (err) {
            throw new Error('Could not log out');
        }
    });
};

const getProfile = async (session) => {
    const user = await User.findOne({ _id: session.user_id });
    if (!user) {
        throw new Error('Could not find an account');
    }

    return {
        username: user.username,
        email: user.email,
        roles: user.roles
    };
};

const getSpecificProfile = async (username) => {
    const user = await User.findOne({ username: sanitize(username) });
    if (!user) {
        throw new Error('Could not find a profile with that username');
    }

    const recipes = await populateRecipe(Recipe.find({ addedBy: user._id }), false);

    return {
        username: user.username,
        recipes: recipes
    };
};

module.exports = {
    createUser, loginUser, logoutUser, getProfile, getSpecificProfile
};