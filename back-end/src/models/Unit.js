const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const validator = require('mongoose-validator');

const unitSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        validate: [
            validator({
                validator: 'isLength',
                arguments: [2, 128],
                message: 'Unit name should be between 2 and 128 characters long'
            }),
            validator({
                validator: 'isAlphanumeric',
                passIfEmpty: false,
                message: 'Unit name should be alphanumeric'
            })
        ]
    },
    shortcut: {
        type: String,
        required: true,
        validate: [
            validator({
                validator: 'isLength',
                arguments: [1, 32],
                message: 'Unit shortcut should be between 1 and 32 characters long'
            })
        ]
    }
});

unitSchema.plugin(timestamps);

unitSchema.post('save', function(error, _, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('Unit name is already in use'));
    } else {
        next(error);
    }
});

module.exports = mongoose.model('Unit', unitSchema);