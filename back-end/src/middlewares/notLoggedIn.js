module.exports = (req, res, next) => {
    if (req.user) {
        return res.sendStatus(403);
    }

    next();
};