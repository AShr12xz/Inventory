const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/getAll', productController.getAllProducts);
router.post('/addProduct', productController.addProduct);
router.post('/deleteProduct', productController.deleteProduct);
router.post('/updateProduct', productController.updateProduct);
router.post('/getProduct', productController.getProduct);
router.post('/getByCouncil', productController.getProductsByCouncil);

module.exports = router;