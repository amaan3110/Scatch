const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path');
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv')
dotenv.config();

// Database connection
const MongoDB = require('./config/db')
MongoDB();


const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');



// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())

// Routes 
app.use('/', authRoutes);
app.use('/user', userRoutes);
app.use('/admin', productRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});