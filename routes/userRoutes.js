const express = require('express');
const router = express.Router();
const { AddToCart, ConfirmOrder, GetDashboard, UserCart, UserOrder, UserAccount, RemoveFromCart } = require('../controllers/userController');
const { isLoggedIn } = require('../middlewares/authMiddleware');


router.get("/", isLoggedIn, GetDashboard);
router.get("/cart", isLoggedIn, UserCart);
router.get("/orderhistory", isLoggedIn, UserOrder);
router.get("/userdetails", isLoggedIn, UserAccount);
router.get("/addtocart/:id", isLoggedIn, AddToCart);
router.get("/removefromcart/:id", isLoggedIn, RemoveFromCart);
router.get("/order/:id", isLoggedIn, ConfirmOrder);

module.exports = router;