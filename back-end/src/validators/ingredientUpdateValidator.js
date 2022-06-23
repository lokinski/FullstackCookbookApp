const Joi = require('joi');

module.exports = (requestBody) => {
    const schema = Joi.object().keys({
        name: Joi.string().error(new Error('No ingredient name was provided'))
    });

    return schema.validate(requestBody);
};