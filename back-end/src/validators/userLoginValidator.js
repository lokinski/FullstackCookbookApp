const Joi = require('joi');

module.exports = (requestBody) => {
    const schema = Joi.object().keys({
        email: Joi.string().required().error(new Error('No username was provided')),
        password: Joi.string().required().error(new Error('No password was provided'))
    });

    return schema.validate(requestBody);
};