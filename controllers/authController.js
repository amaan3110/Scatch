const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
const { sendWelcomeEmail } = require('../services/email-service');

Register = async (req, res) => {
    const { username, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        req.flash('error', 'User already exists 😅');
        return res.redirect('/');
    }
    if (!username || !email || !password) {
        req.flash('error', 'All fields are required 😬');
        return res.redirect('/');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
        name: username,
        email: email,
        password: hash
    });
    await sendWelcomeEmail(email, username);
    req.flash('success', 'Successfully registered 🥳');
    return res.redirect('/');
};

Login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        req.flash('error', 'All fields are required 😬');
        return res.redirect('/');
    }

    if (email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ email: process.env.ADMIN_EMAIL }, process.env.JWT_KEY);
        res.cookie('token', token);
        req.flash('success', 'Welcome Admin!');
        res.redirect('/admin');
        return;
    }
    const user = await User.findOne({ email });
    if (!user) {
        req.flash('error', 'User not found 🫣');
        return res.redirect('/');
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_KEY);
        res.cookie('token', token);
        req.flash('success', 'Login successfully! 🎉');
        res.redirect('/user');
    } else {
        req.flash('error', 'Incorrect password 😶‍🌫️');
        res.redirect('/');
    }
};

Logout = (req, res) => {
    res.clearCookie('token');
    req.flash('success', 'See you again soon! 👋');
    res.redirect('/');
};

module.exports = { Register, Login, Logout };
