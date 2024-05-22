const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
    if (!req.cookies.token || req.cookies.token === "") {
        return res.status(401).send('You must be logged in');
    }
    else {
        const data = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        req.user = data;
    }
    next();
};