const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    default: [],
  },
  rating: {
    type: String,
    required: true,
  },
  reviews: {
    type: String,
    required: true,
  },
});

const ItemModel = mongoose.model("Item", itemSchema);

module.exports = ItemModel;
