const express = require('express');
const router = express.Router();
const { Register, Login, Logout } = require('../controllers/authController');


router.get('/', (req, res) => {
    res.render("index");
});

router.post('/login', Login);
router.post('/register', Register);
router.get('/logout', Logout);

module.exports = router;