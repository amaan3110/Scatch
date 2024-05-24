const express = require('express');
const router = express.Router();
const { AddProduct, DeleteProduct, GetProducts } = require('../controllers/productController');
const { isLoggedIn, isAdmin } = require('../middlewares/authMiddleware');


router.get('/', isLoggedIn, isAdmin, GetProducts);
router.post('/addproduct', isLoggedIn, AddProduct);
router.get('/delete/:id', isLoggedIn, DeleteProduct);

module.exports = router;