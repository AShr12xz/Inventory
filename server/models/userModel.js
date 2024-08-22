const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Password Confirm is required'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not the same'
        }
    },
    role: {
        type: String,
        enum: ['student', 'manager','secretary'],
        default: 'student'
    }
});

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

const User = mongoose.model('User', userSchema);
module.exports = User;