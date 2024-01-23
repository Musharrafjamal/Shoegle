const mongoose = require("mongoose");

const cartModel = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },  
});

const CartModel = mongoose.model("Cart", cartModel);

module.exports = CartModel;


// This will be adress model!
// then i will make new model for only cart item 
// from frontend i will make a new array for all item including dublicate items to get the all item for delever
// Will make a order route to display all orders filtered by costomers!