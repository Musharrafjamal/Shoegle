const mongoose = require("mongoose");

const allAddressSchema = new mongoose.Schema({
  idEmail: {
    type: String,
    required: true
  },
  locations: {
    type: Array,
    default: [],
  },
});

const AllAddressModel = mongoose.model("allAddress", allAddressSchema);

module.exports = AllAddressModel;