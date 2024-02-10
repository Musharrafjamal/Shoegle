const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

})

const ConfirmOrderModel = mongoose.model("order", orderSchema);

module.exports = ConfirmOrderModel;