const express = require('express');
const router = express.Router();
const { Register, Login, Logout } = require('../controllers/authController');


router.get('/', (req, res) => {
    if (req.cookies.token) {
        return res.redirect('/user');
    } else {
        return res.render("index", { messages: req.flash() });
    }

});
router.post('/login', Login);
router.post('/register', Register);
router.get('/logout', Logout);

module.exports = router;