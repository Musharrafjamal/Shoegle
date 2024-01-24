const express = require("express");
const ItemModel = require("../model/itemModel");

const router = express.Router();

router.post("/add-product", async (req, res) => {
  try {
    const { name, price, description, images, reviews } = req.body;
    const item = new ItemModel({
      name,
      description,
      price,
      images,
      reviews,
    });
    const savedItem = await item.save();
    // console.log(savedItem)
    res.status(201).json(savedItem);
  } catch (err) {
    console.log("Error on Adding product: ", err.message);
  }
});

router.get("/get-item", async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(404).json("error on getting items: ", err.message);
  }
});

router.post("/get-cart-item", async (req, res) => {
  try {
    const arrayOfId = req.body.id;
    const arrayOfItem = await Promise.all(
      arrayOfId.map(async (id) => {
        const item = await ItemModel.findById(id.id);
        return item;
      })
    );
    res.status(200).json(arrayOfItem);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error on getting items", message: err.message });
  }
});
router.post("/item", async (req, res) => {
  try {
    const id = req.body.id;
    const item = await ItemModel.findById(id);
    res.status(200).json(item);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error on getting items", message: err.message });
  }
});

module.exports = router;
