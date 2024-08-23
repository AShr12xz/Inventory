const express = require('express');
const Product = require('./../models/productModel');
const userProduct = require('./../models/userProductModel');
const asyncCheck = require('./../utils/asyncCheck');
const error = require('./../utils/error');

exports.showUserProducts = asyncCheck(async (req, res) => {
    const products = await userProduct.find({ issuerName: req.body.issuerName });
    if (!products) {
        return next(new error('No product found with the student', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            products
        }
    });
})


exports.reserveRequest = asyncCheck(async (req, res) => {
    const request = req.body;
    if (req.body.council === "Sports and Games") {
        request.secyApprovalStatus = "Approved";
    }
    request.requestDate = new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    const newRequest = await userProduct.create(request);

    res.status(201).json({
        status: 'success',
        data: {
            product: newRequest
        }
    });
})


exports.showRequestToSecy = asyncCheck(async (req, res) => {
    const products = await userProduct.find({ managedBy: req.body.managedBy });
    if (!products) {
        return next(new error('No product found with the student', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            products
        }
    });
})


exports.requestApprovedBySecy = asyncCheck(async (req, res) => {
    const product = await userProduct.findOne
        ({
            name: req.body.name,
            issuerName: req.body.issuerName,
        })
    if (!product) {
        return next(new error('No product found with that ID', 404));
    }
    product.secyApprovalStatus = "Approved";
    await product.save();
})

exports.requestRejectedBySecy = asyncCheck(async (req, res) => {
    const product = await userProduct.findOne
        ({
            name: req.body.name,
            issuerName: req.body.issuerName,
        })
    if (!product) {
        return next(new error('No product found with that ID', 404));
    }
    product.secyApprovalStatus = "Rejected";
    await product.save();
})


exports.showProductToManger = asyncCheck(async (req, res) => {
    const products = await userProduct.find({ secyApprovalStatus: "Approved" });
    if (!products) {
        return next(new error('No product found with the student', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            products
        }
    });
})


exports.requestRejectedByManager = asyncCheck(async (req, res) => {
    const product = await userProduct.findOne
        ({
            name: req.body.name,
            issuerName: req.body.issuerName,
        })
    if (!product) {
        return next(new error('No product found with that ID', 404));
    }
    product.managerApprovalStatus = "Rejected";
    await product.save();
})


exports.requestApprovedByManager = asyncCheck(async (req, res, next) => {
    const product = await userProduct.findOne({
        name: req.body.name,
        issuerName: req.body.issuerName,
    });

    if (!product) {
        return next(new error('No product found with that ID', 404));
    }
    product.managerApprovalStatus = "Approved";
    await product.save();
    const issuedProduct = await Product.findOne({ name: req.body.name });

    // Check if the issued product exists
    if (!issuedProduct) {
        return next(new error('No issued product found with that name', 404));
    }

    issuedProduct.quantityAvailable -= req.body.quantityIssued;

    // Format the approved date to British format without seconds
    issuedProduct.approvedDate = new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
    await issuedProduct.save();
    res.status(200).json({
        status: 'success',
        message: 'Product approval updated and quantity adjusted successfully.',
    });
});


exports.takenIssuedProduct = checkAsync(async(req,res) => {
    const product = userProduct.findOne({
        name: req.body.name,
        issuerName: req.body.issuerName,
    });
    if (!product) {
        return next(new error('No product found with that ID', 404));
    }
    product.issuedDate = new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
})

exports.returnedProduct = checkAsync(async(req, res) => {
    const product = userProduct.findOne({
        name: req.body.name,
        issuerName: req.body.issuerName,
    });
    if (!product) {
        return next(new error('No product found with that ID', 404));
    }
    product.returnDate = new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
    await product.save();
    const issuedProduct = await Product.findOne({ name: req.body.name });
    if (!issuedProduct) {
        return next(new error('No issued product found with that name', 404));
    }
    issuedProduct.quantityAvailable += req.body.quantityIssued;
    await issuedProduct.save();
    res.status(200).json({
        status: 'success',
        message: 'Product returned successfully.',
    });
})