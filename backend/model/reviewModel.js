const mongoose = require("mongoose");

const review = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userImg: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  reviewMessage: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    default: [],
  },
});

const ReviewModel = mongoose.model("Review", review);

module.exports = ReviewModel;