const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: Array,
    default: [],
  },
  rating: {
    type: Number,
  },
  reviews: {
    type: Number,
    required: true,
  }
});

const ItemModel = mongoose.model("Item", itemSchema);

module.exports = ItemModel;
