const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const dotenv = require('dotenv')
dotenv.config();

const MongoDB = require('./config/db')
MongoDB();

const User = require('./models/user-model')
const Product = require('./models/product-model');
const { Register, Login, Logout } = require('./controllers/authController');
const { AddProduct, DeleteProduct, GetProducts } = require('./controllers/productController');
const { AddToCart, Orders, GetDashboard, GetCart, GetOrder, UserAccount } = require('./controllers/userController');
const { isLoggedIn } = require('./middlewares/authMiddleware');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())

app.get('/', (req, res) => {
    res.render("index");
});

// dashboard, cart and orders modules routes

app.get("/dashboard", isLoggedIn, GetDashboard);
app.get("/dashboard/cart", isLoggedIn, GetCart);
app.get("/dashboard/orderhistory", isLoggedIn, GetOrder);
app.get('/addtocart/:id', isLoggedIn, AddToCart);
app.get('/dashboard/cart/order/:id', isLoggedIn, Orders);
app.get('/dashboard/useraccount', isLoggedIn, UserAccount)

// product module routes

app.post('/admin/addproduct', isLoggedIn, AddProduct);
app.get('/admin', isLoggedIn, GetProducts);
app.get('/delete/:id', isLoggedIn, DeleteProduct);

// user module routes

app.post('/login', Login);
app.post('/register', Register);
app.get('/logout', Logout);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});