const express = require("express");
const ItemModel = require("../model/itemModel");

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { name, price } = req.body;
    const item = new ItemModel({
      name,
      price,
    });
    await item.save();
    res.status(200).send("Product added successfully!");
  } catch (err) {
    console.log("Error on Adding product: ", err.message);
  }
});

router.get("/get", async (req, res) => {
  try {
    res.status(200).send("Get product route working fine!");
  } catch (err) {
    console.log("Error on Adding product: ", err.message);
  }
});

module.exports = router;
