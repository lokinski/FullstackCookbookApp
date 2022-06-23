const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

categorySchema.plugin(timestamps);

categorySchema.post('save', function(error, _, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('Category name is already in use'));
    } else {
        next(error);
    }
});

module.exports = mongoose.model('Category', categorySchema);