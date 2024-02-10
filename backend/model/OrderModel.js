const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
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
