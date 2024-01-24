const mongoose = require("mongoose");

const addressModel = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
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

const AddressModel = mongoose.model("Address", addressModel);

module.exports = AddressModel;


// This will be adress model!
// then i will make new model for only cart item 
// from frontend i will make a new array for all item including dublicate items to get the all item for delever
// Will make a order route to display all orders filtered by costomers!