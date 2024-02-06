const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  idEmail: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  items: {
    type: Array,
    default: [],
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;
