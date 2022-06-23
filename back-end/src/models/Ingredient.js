const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const ingredientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

ingredientSchema.plugin(timestamps);

ingredientSchema.post('save', function(error, _, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('Ingredient name is already in use'));
    } else {
        next(error);
    }
});

module.exports = mongoose.model('Ingredient', ingredientSchema);