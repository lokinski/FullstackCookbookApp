const User = require('../models/User');

module.exports = async (req, _, next) => {
    const uid = req.session.user_id;
    if (uid) {
        req.user = await User.findById(uid);
    }
    next();
};