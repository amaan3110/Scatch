const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { AddProduct, DeleteProduct, GetProducts } = require('../controllers/productController');
const { isLoggedIn, isAdmin } = require('../middlewares/authMiddleware');


router.get('/', isLoggedIn, isAdmin, GetProducts);
router.post('/addproduct', isLoggedIn, upload.single('image'), AddProduct);
router.get('/delete/:id', isLoggedIn, DeleteProduct);

module.exports = router;