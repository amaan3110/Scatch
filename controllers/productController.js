const Product = require('../models/product-model');

AddProduct = async (req, res) => {
    try {
        const { product, price, discount, bgcolor, panelcolor, textcolor } = req.body;

        if (!product || !price || !discount || !bgcolor || !panelcolor || !textcolor) {
            return res.status(400).send("All fields are required.");
        }
        const details = await Product.create({
            name: product,
            price: price,
            discount: discount,
            bgcolor: bgcolor,
            panelcolor: panelcolor,
            textcolor: textcolor
        });
        res.redirect("/admin");
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).send("An error occurred while creating the product.");
    }
};

DeleteProduct = async (req, res) => {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
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