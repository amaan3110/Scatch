const User = require('../models/user-model');
const Product = require('../models/product-model');
const { sendConfirmationEmail } = require('../services/email-service');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

GetDashboard = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        const products = await Product.find();
        const messages = req.flash();
        res.render("mainScreen", { user, products, messages });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

};

UserCart = async (req, res) => {
    try {
        const userCart = await User.findOne({ email: req.user.email }).populate('cart');
        const messages = req.flash();
        res.render("cartScreen", { userCart, messages });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

UserOrder = async (req, res) => {
    try {
        const userOrder = await User.findOne({ email: req.user.email }).populate('orders');
        res.render("orderScreen", { userOrder });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

UserAccount = async (req, res) => {
    try {
        const userDetails = await User.findOne({ email: req.user.email });
        res.render("userAccount", { userDetails });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

AddToCart = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        const user = await User.findOne({ email: req.user.email });
        user.cart.push(product._id);
        await user.save();
        req.flash('success', 'Product added to cart successfully 😇');
        res.redirect('/user/cart');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

RemoveFromCart = async (req, res) => {
    try {
        const productId = req.params.id;
        const user = await User.findOne({ email: req.user.email });
        user.cart.pull(productId);
        await user.save();
        req.flash('error', 'Product removed from cart');
        res.redirect('/user/cart');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

ConfirmOrder = async (req, res) => {
    try {
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
        req.flash('success', 'Your order has been placed successfully 🎁');
        res.redirect('/user');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

Checkout = async (req, res) => {
    try {
        const productId = req.body.productId;
        if (!productId) {
            return res.status(400).send('Product ID is missing');
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: product.name,
                        },
                        unit_amount: product.price * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.YOUR_DOMAIN}/user/payment/success`,
            cancel_url: `${process.env.YOUR_DOMAIN}/user/cart`,
        });

        res.redirect(303, session.url);
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        if (error.type === 'StripeInvalidRequestError') {
            console.error('StripeInvalidRequestError:', error.message);
        }
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { AddToCart, ConfirmOrder, GetDashboard, UserCart, UserOrder, UserAccount, RemoveFromCart, Checkout }