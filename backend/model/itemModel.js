const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: String,
  price: {
    type: String,
    require: true,
  },
  images: {
    type: Array,
    default: [],
  },
  rating: {
    type: String,
    require: true,
  },
  reviews: {
    type: String,
    require: true,
  },
});

const ItemModel = mongoose.model("Item", itemSchema);

module.exports = ItemModel;
