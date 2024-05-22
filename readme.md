# E-commerce Website for Bags

This repository contains the code for an e-commerce website specializing in bags. The application is built using Node.js and Express, with MongoDB as the database. It includes user authentication, product management, and shopping cart functionalities.

## Features

- User registration and login with JWT authentication
- Add, delete, and view products
- Add products to cart and place orders
- User dashboard to manage account, cart, and order history

## Prerequisites

- Node.js installed
- MongoDB installed and running
- A `.env` file with the following environment variables:
  - `PORT`: Port number for the server
  - `MONGO_URI`: MongoDB connection string
  - `JWT_SECRET`: Secret key for JWT

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/ecommerce-bags.git
    cd ecommerce-bags
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up the environment variables by creating a `.env` file:
    ```plaintext
    PORT=3000
    MONGO_URI=your_mongo_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Start the server:
    ```bash
    npm start
    ```

## Project Structure

- `config/db.js`: MongoDB connection configuration
- `models/user-model.js`: Mongoose schema and model for users
- `models/product-model.js`: Mongoose schema and model for products
- `controllers/authController.js`: Handles user registration, login, and logout
- `controllers/productController.js`: Handles adding, deleting, and fetching products
- `controllers/userController.js`: Handles user dashboard, cart, and orders
- `middlewares/authMiddleware.js`: Middleware to check if a user is logged in
- `public/`: Static files (CSS, JS, images)
- `views/`: EJS templates for rendering HTML

## Running the Project

1. Ensure MongoDB is running.
2. Start the server:
    ```bash
    npm start
    ```
3. Open your browser and go to `http://localhost:3000` to view the website.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any bugs or feature requests.

## License

This project is licensed under the MIT License.

## Acknowledgements

- Node.js
- Express
- MongoDB
- JWT
- EJS

Feel free to reach out if you have any questions or need further assistance!
