const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderByEmail: {
    type: String,
    required: true
  },
  orderByPicture: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    default: [],
  },
  paymentOption: {
    type: String,
    required: true,
  },
});

const OrderModel = mongoose.model("Allorder", orderSchema);

module.exports = OrderModel;
