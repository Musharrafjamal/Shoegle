const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
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
