const Joi = require('joi');

module.exports = (requestBody) => {
    const schema = Joi.object().keys({
        username: Joi.string().required().error(new Error('No username was provided')),
        email: Joi.string().required().error(new Error('No email was provided')),
        password: Joi.string().required().error(new Error('No password was provided'))
    });

    return schema.validate(requestBody);
};