const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

module.exports = (requestBody) => {
    const schema = Joi.object().keys({
        name: Joi.string().required().error(new Error('No recipe name was provided')),
        ingredients: Joi.array().items(Joi.object().keys({
            ingredient: Joi.objectId().required(),
            unit: Joi.objectId().required(),
            count: Joi.number().required()
        })).required().error(new Error('No correct ingredients were provided')),
        steps: Joi.array().required().error(new Error('No recipe steps was provided')),
        category: Joi.objectId().required().error(new Error('No recipe category was provided')),
        cuisine: Joi.objectId().required().error(new Error('No recipe cuisine was provided')),
        tags: Joi.array().items(Joi.string()).error(new Error('Wrong tags')),
        vegetarian: Joi.boolean().required().error(new Error('No vegetarian info was provided')),
        vegan: Joi.boolean().required().error(new Error('No vegan info was provided'))
    });

    return schema.validate(requestBody);
};