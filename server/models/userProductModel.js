const mongoose = require('mongoose');
const validator = require('validator');

const userProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    quantityIssued: {
        type: Number,
        required: [true, 'Quantity is required']
    },
    issuerName: {
        type: String,
        required: [true, 'Issuer is required']
    },
    issuerMail: {
        type: String,
        required: [true, 'Issuer mail is required'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    requestDate: {
        type: Date,
        required: [true, 'Request date is required']
    },
    approvedDate: {
        type: Date
    },
    issuedDate: {
        type: Date
    },
    returnDate: {
        type: Date
    },
    secyApprovalStatus: {
        type: String,
        enum: [
            "Approved",
            "Rejected",
            "Pending"
        ],
        default: "Pending"
    },
    managerApprovalStatus: {
        type: String,
        enum: [
            "Approved",
            "Rejected",
            "Pending"
        ],
        default: "Pending"
    },
    returnDescription: {
        type: String,
        // required: [true, 'Description is required']
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