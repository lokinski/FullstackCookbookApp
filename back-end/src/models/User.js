const mongoose = require('mongoose');
const validator = require('mongoose-validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        validate: [
            validator({
                validator: 'isLength',
                arguments: [3, 32],
                message: 'Username should be between 3 and 32 characters long'
            }),
            validator({
                validator: 'isAlphanumeric',
                passIfEmpty: true,
                message: 'Username should be alphanumeric'
            })
        ]
    },
    password: {
        type: String,
        required: true,
        validate: [
            validator({
                validator: 'isLength',
                arguments: [6, 80],
                message: 'Password should be between 6 and 80 characters long'
            })
        ]
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [
            validator({
                validator: 'isEmail',
                message: 'Enter a valid email address'
            })
        ]
    },
    roles: {
        type: [String],
        enum: ["admin"],
        default: []
    },
    registerDate: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function(next) {
    let self = this;

    if (!self.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(self.password, salt);

    self.password = hashedPassword;

    next();
});

userSchema.post('save', function(error, _, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('Username or email is already in use'));
    } else {
        next(error);
    }
});

module.exports = mongoose.model('User', userSchema);