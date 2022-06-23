const Joi = require('joi');

module.exports = (requestBody) => {
    const schema = Joi.object().keys({
        name: Joi.string().error(new Error('No unit name was provided')),
        shortcut: Joi.string().error(new Error('No unit shortcut was provided'))
    });

    return schema.validate(requestBody);
};