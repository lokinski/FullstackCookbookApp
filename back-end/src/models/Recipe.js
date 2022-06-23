const mongoose = require('mongoose');
const validator = require('mongoose-validator');
const mongoosePaginate = require('mongoose-paginate-v2');
const objectIdsValidator = require('mongoose-id-validator');
const timestamps = require('mongoose-timestamp');

const recipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: [
            validator({
                validator: 'isLength',
                arguments: [1, 128],
                message: 'Recipe name should be between 1 and 128 characters long'
            })
        ]        
    },
    ingredients: [{
        ingredient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingredient',
            required: true
        },
        unit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Unit',
            required: true
        },
        count: Number
    }],
    ingredientsCount: {
        type: Number,
        default: 0
    },
    steps: {
        type: [String],
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    cuisine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cuisine',
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    vegetarian: {
        type: Boolean,
        required: true
    },
    vegan: {
        type: Boolean,
        required: true
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

recipeSchema.pre('save', function(next) {
    this.ingredientsCount = this.ingredients.length;
    next();
});

recipeSchema.plugin(timestamps);
recipeSchema.plugin(objectIdsValidator, {
    message: "One of the recipe elements is wrong or doesn't exist"
});
recipeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Recipe', recipeSchema);