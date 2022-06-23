const Joi = require('joi');

module.exports = (requestBody) => {
    const schema = Joi.object().keys({
        name: Joi.string().required().error(new Error('No cuisine name was provided'))
    });

    return schema.validate(requestBody);
};