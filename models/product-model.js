const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        //required: true
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbGFBskopBcfmfKt3gB11zHUsy1YtHh3TXEtMm57yVMQ&s'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    bgcolor: {
        type: String,
        required: true
    },
    textcolor: {
        type: String,
        required: true
    },
    panelcolor: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;