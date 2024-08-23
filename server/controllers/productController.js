const express = require('express');
const Product = require('./../models/productModel');
const asyncCheck = require('./../utils/asyncCheck');
const error = require('./../utils/error');

exports.getAllProducts = asyncCheck(async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        status: 'success',
        data: {
            products
        }
    });
});

exports.addProduct = asyncCheck(async (req, res) => {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            product: newProduct
        }
    });
})

exports.deleteProduct = asyncCheck(async (req, res) => {
    const product = await Product.findOneAndDelete({name:req.body.name});
    if (!product) {
        return next(new error('No product found with that ID', 404));
    }
    res.status(204).json({
        status: 'success',
        data: null
    });
})

exports.updateProduct = asyncCheck(async (req, res) => {
    const product = await Product.findOneAndUpdate({name:req.body.name}, req.body, {
        new: true,
        runValidators: true
    });
    if (!product) {
        return next(new error('No product found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    });
})

exports.getProduct = asyncCheck(async (req, res) => {
    console.log(req.body);

    const product = await Product.findOne({ name: req.body.name });
    if (!product) {
        return next(new error('No product found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    });
});

exports.getProductsByCouncil = asyncCheck(async (req, res) => {
    const products = await Product.find({
        council: req.body.council
    });
    if (!products) {
        return next(new error('No product found with that ID',
            404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            products
        }
    });
})