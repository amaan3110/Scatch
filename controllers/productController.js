const Product = require('../models/product-model');
const cloudinary = require('../config/cloudinary');
const path = require('path');

AddProduct = async (req, res) => {
    try {
        const { product, price, discount, bgcolor, panelcolor, textcolor } = req.body;

        if (!product || !price || !discount || !bgcolor || !panelcolor || !textcolor) {
            return req.flash('error', 'All fields are required.');
        }

        if (!req.file) {
            return req.flash('error', 'Image is required.');
        }

        const result = await cloudinary.uploader.upload(req.file.path);
        const details = await Product.create({
            name: product,
            price: price,
            discount: discount,
            bgcolor: bgcolor,
            panelcolor: panelcolor,
            textcolor: textcolor,
            image: result.secure_url // URL of the uploaded image from Cloudinary
        });
        req.flash('success', 'Product added successfully');
        res.redirect("/admin");

    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).send("An error occurred while creating the product.");
    }
};

DeleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await Product.findByIdAndDelete(id);
        req.flash('error', 'Product deleted successfully');
        res.redirect('/admin');
    } catch (error) {
        console.error("Error deleting product", error);
        res.status(500).send("An error occurred while deleting the product.");
    }

};

GetProducts = async (req, res) => {
    try {
        const products = await Product.find();
        const messages = req.flash();
        res.render("admin", { products, messages });
    } catch (error) {
        console.error("Error while fetching product", error);
        res.status(500).send("An error occurred while fetching the product.");
    }

};


module.exports = {
    AddProduct,
    DeleteProduct,
    GetProducts
}