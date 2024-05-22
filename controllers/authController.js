const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

Register = async (req, res) => {
    const { username, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        return res.send('User already exists');
    }
    if (!username || !email || !password) {
        return res.status(400).send("All fields are required.");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
        name: username,
        email: email,
        password: hash
    });
    res.redirect('/');
};

Login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send("All fields are required.");
    }

    if (email == 'admin@admin.in' && password == 'admin') {
        const token = jwt.sign({ email: "admin@admin.in" }, process.env.JWT_KEY);
        res.cookie('token', token);
        res.redirect('/admin');
        return;
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.send('User not found');
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_KEY);
        res.cookie('token', token);
        res.redirect('/dashboard');
    } else {
        res.send('Incorrect password');
    }
};

Logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};

module.exports = { Register, Login, Logout };
