const Product = require('../models/product-model');
const upload = require('../middlewares/multerConfig');
const path = require('path');

AddProduct = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).send(err);
        } else {
            const { product, price, discount, bgcolor, panelcolor, textcolor } = req.body;

            if (!product || !price || !discount || !bgcolor || !panelcolor || !textcolor) {
                return req.flash('error', 'All fields are required.');
            }

            const imagename = path.basename(req.file.filename);
            try {
                const details = await Product.create({
                    name: product,
                    price: price,
                    discount: discount,
                    bgcolor: bgcolor,
                    panelcolor: panelcolor,
                    textcolor: textcolor,
                    image: imagename
                });
                //console.log(details);
                req.flash('success', 'Product added successfully');
                res.redirect("/admin");
            } catch (error) {
                console.error("Error creating product:", error);
                res.status(500).send("An error occurred while creating the product.");
            }
        }
    });
};

DeleteProduct = async (req, res) => {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    req.flash('error', 'Product deleted successfully');
    res.redirect('/admin');
};

GetProducts = async (req, res) => {
    const products = await Product.find();
    const messages = req.flash();
    res.render("admin", { products, messages });
};


module.exports = {
    AddProduct,
    DeleteProduct,
    GetProducts
}