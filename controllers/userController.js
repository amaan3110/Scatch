const User = require('../models/user-model');
const Product = require('../models/product-model');
const { sendConfirmationEmail } = require('../services/email-service');

GetDashboard = async (req, res) => {
    const user = await User.findOne({ email: req.user.email });
    const products = await Product.find();
    res.render("mainScreen", { user, products });
};

UserCart = async (req, res) => {
    const userCart = await User.findOne({ email: req.user.email }).populate('cart');
    res.render("cartScreen", { userCart });
};

UserOrder = async (req, res) => {
    const userOrder = await User.findOne({ email: req.user.email }).populate('orders');
    res.render("orderScreen", { userOrder });
}

UserAccount = async (req, res) => {
    const userDetails = await User.findOne({ email: req.user.email });
    res.render("userAccount", { userDetails });
}

AddToCart = async (req, res) => {
    const product = await Product.findById(req.params.id);
    const user = await User.findOne({ email: req.user.email });
    user.cart.push(product._id);
    await user.save();
    res.redirect('/user/cart');
};

RemoveFromCart = async (req, res) => {
    const productId = req.params.id;
    const user = await User.findOne({ email: req.user.email });
    user.cart.pull(productId);
    await user.save();
    res.redirect('/user/cart');
};

ConfirmOrder = async (req, res) => {
    const product = await Product.findById(req.params.id);
    const user = await User.findOne({ email: req.user.email });
    user.orders.push(product._id);
    user.cart.pull(product._id);
    await user.save();
    const orderDetails = [
        {
            name: product.name,
            quantity: 1,
            price: product.price,
            orderId: product._id
        }
    ];

    await sendConfirmationEmail(user.email, user.name, orderDetails);
    res.redirect('/user');
};

module.exports = { AddToCart, ConfirmOrder, GetDashboard, UserCart, UserOrder, UserAccount, RemoveFromCart }