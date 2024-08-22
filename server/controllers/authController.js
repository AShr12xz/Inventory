const jwt = require('jsonwebtoken');
const error = require('../utils/error')
const asyncCheck = require('../utils/asyncCheck')
const fs = require('fs');
const User = require('../models/userModel');
require("dotenv").config();

const signToken = (id, user = 'student') => {
    return jwt.sign({ id, user }, process.env.JWT_SECRET, {
        expiresIn: '90d'
    });
};

// env me daalna hai
const validSecyCodes = [
    'FootSec123',
    'CultSec123',
    'TechSec123',
    'SportsSec123'
  ]

const allowedEmails = fs.readFileSync('studentEmails.txt', 'utf8').split('\n');

exports.signup = asyncCheck(async (req, res, next) => {
    const { email } = req.body;

    if (!allowedEmails.includes(email)) {
        return next(new error('Email not found in the list', 400));
    }
    if(req.body.role === 'manager') {
        if(req.body.code != 'Man123') {
            return next(new error('Invalid Manager Code', 400));
        }
    }
    if(req.body.role === 'secretary') {
        if(!validSecyCodes.includes(req.body.code)) {
            return next(new error('Invalid Secretary Code', 400));
        }
    }
    const filteredBody = { ...req.body };
    delete filteredBody.code;
    console.log(filteredBody);

    const newUser = await User.create(req.body);

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    });
});

exports.login = asyncCheck(async (req, res, next) => {

    const { uniqueId, password } = req.body;
    if (!uniqueId || !password)
        return next(new error("All fields are required", 400));

    const user = await User.findOne({ uniqueId });
    if (!user || !await user.comparePassword(password, user.password)) {
        return next(new error("Incorrect email or password", 401));
    }

    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        token,
        data: {
            user: user
        }
    });
})

module.exports.userVerification = (req, res) => {
  const { token } = req.body;
  console.log(token);
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user)
        return res.json({
          status: true,
          user: user,
        });
      else return res.json({ status: false });
    }
  });
};
