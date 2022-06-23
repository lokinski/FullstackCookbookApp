module.exports = function(...roles) {
    return (req, res, next) => {
        if (req.user) {
            if (roles.length == 0 || 
                (req.user.roles 
                    && req.user.roles.some(o => roles.includes(o)))
            ) {
                return next();
            }
        }
        return res.sendStatus(403);
    };
};