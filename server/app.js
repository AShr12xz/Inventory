const express = require('express');
const productRouter = require('./routes/productRoutes');
const userProductRouter = require('./routes/userProductRoutes');

const app = express();

app.get("/", (req, res) => {
    res.json("Hello Habibi");
});

app.use(express.json());
app.use('/products', productRouter);
app.use("/userProducts", userProductRouter);

module.exports = app;
