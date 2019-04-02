const express = require('express');
const router = express.Router();
const paylane = require('./paylane');
const product = require('./product');
const auth = require('../auth');

// Paylane
router.post('/generateToken', paylane.generateToken);
router.post('/saleByToken', paylane.saleByToken);

// Products
router.get('/products', product.getProducts);
router.get('/user-products', auth.isAuthenticated, product.getUserProducts);
router.put('/product', auth.isAuthenticated, product.putProduct);

module.exports = router
