const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    quantityAvailable: {
        type: Number,
        required: [true, 'Quantity is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    council: {
        type: String,
        required: [true, 'Category is required']
    },
    managedBy: {
        type: String,
        required: [true, 'Managed by is required'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    image: {
        type: String,
        // required: [true, 'Image is required'],
        validate: [validator.isURL, 'Please provide a valid URL']
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
