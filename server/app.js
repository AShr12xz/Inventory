const express = require('express');
const mongoose = require('mongoose');
const productRouter = require('./routes/productRoutes');

const app = express();

app.get("/", (req, res) => {
    res.json("Hello Habibi");
});

app.use(express.json());
app.use('/products', productRouter);

module.exports = app;
