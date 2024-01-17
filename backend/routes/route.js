const express = require("express");
const ItemModel = require("../model/itemModel");

const router = express.Router();

router.post("/add-product", async (req, res) => {
  try {
    const { name, price, description, images } = req.body;
    const item = new ItemModel({
      name,
      description,
      price,
      images,
    });
    const savedItem = await item.save();
    // console.log(savedItem)
    res.status(201).json(savedItem);
  } catch (err) {
    console.log("Error on Adding product: ", err.message);
  }
});



module.exports = router;
