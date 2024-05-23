const User = require('../models/user-model');
const Product = require('../models/product-model');

GetDashboard = async (req, res) => {
    const user = await User.findOne({ email: req.user.email });
    const products = await Product.find();
    res.render("dashboard", { user, products });
};

GetCart = async (req, res) => {
    const userCart = await User.findOne({ email: req.user.email }).populate('cart');
    res.render("cartScreen", { userCart });
};

GetOrder = async (req, res) => {
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
    res.redirect('/dashboard/cart');
};

RemoveFromCart = async (req, res) => {
    const productId = req.params.id;
    const user = await User.findOne({ email: req.user.email });
    user.cart.pull(productId);
    await user.save();
    res.redirect('/dashboard/cart');
};

Orders = async (req, res) => {
    const product = await Product.findById(req.params.id);
    const user = await User.findOne({ email: req.user.email });
    user.orders.push(product._id);
    user.cart.pull(product._id);
    await user.save();
    res.redirect('/dashboard');
};

module.exports = { AddToCart, Orders, GetDashboard, GetCart, GetOrder, UserAccount, RemoveFromCart }