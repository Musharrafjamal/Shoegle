const express = require("express");
const ItemModel = require("../model/itemModel");
const ReviewModel = require("../model/reviewModel");
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
router.post("/post-review", async (req, res) => {
  try {
    const { productId, userName, userImg, rating, reviewMessage, images } =
      req.body;
    const item = new ReviewModel({
      productId,
      userName,
      userImg,
      rating,
      reviewMessage,
      images,
    });
    const savedItem = await item.save();
    const productData = await ItemModel.findById(productId);
    productData.reviews.push(savedItem._id);
    await productData.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error on getting items", message: err.message });
  }
});
router.post("/get-all-review", async (req, res) => {
  try {
    const { ids } = req.body;
    const items = await Promise.all(
      ids.map(async (id) => {
        return await ReviewModel.findById(id);
      })
    );
    res.status(201).json(items);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error on getting items", message: err.message });
  }
});


module.exports = router;
