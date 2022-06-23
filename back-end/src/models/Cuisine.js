const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const cuisineSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

cuisineSchema.plugin(timestamps);

cuisineSchema.post('save', function(error, _, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('Cuisine name is already in use'));
    } else {
        next(error);
    }
});

module.exports = mongoose.model('Cuisine', cuisineSchema);