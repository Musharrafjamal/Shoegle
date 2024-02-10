const express = require("express");
const ItemModel = require("../model/itemModel");
const ReviewModel = require("../model/reviewModel");
const AddressModel = require("../model/addressModel");
const AllAddressModel = require("../model/allAddress");
const OrderModel = require("../model/OrderModel");
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
router.post("/add-delivery-address", async (req, res) => {
  try {
    const {
      idEmail,
      customerName,
      phoneNumber,
      email,
      country,
      state,
      city,
      pincode,
      address,
    } = req.body;

    const Info = new AddressModel({
      customerName,
      phoneNumber,
      email,
      country,
      state,
      city,
      pincode,
      address,
    });
    const savedInfo = await Info.save();
    const availableData = await AllAddressModel.findOne({ idEmail });
    if (availableData) {
      availableData.locations.push(savedInfo);
      await availableData.save();
      res.status(201).json(availableData);
    } else {
      const data = new AllAddressModel({
        idEmail,
        locations: [savedInfo],
      });
      const savedData = await data.save();
      res.status(201).json(savedData);
    }
  } catch (err) {
    res.status(500).json({
      error: "Error on adding address information",
      message: err.message,
    });
  }
});
router.post("/delete-address", async (req, res) => {
  try {
    const { idEmail, id } = req.body;
    await AddressModel.findByIdAndDelete(id);

    let deleteAvailableAddress = await AllAddressModel.findOne({ idEmail });
    if (deleteAvailableAddress) {
      deleteAvailableAddress.locations =
        deleteAvailableAddress.locations.filter((data) => {
          return data._id.toString() !== id.toString();
        });
      deleteAvailableAddress = await deleteAvailableAddress.save();
      res.status(201).json(deleteAvailableAddress);
    } else {
      res.status(500).json("Error on deleting address information");
    }
  } catch (err) {
    res.status(500).json({
      error: "Error on deleting address information",
      message: err.message,
    });
  }
});

router.post("/get-address", async (req, res) => {
  try {
    const { idEmail } = req.body;
    const info = await AllAddressModel.findOne({ idEmail });
    if (info !== null) {
      res.status(201).json(info);
    }
  } catch (err) {
    res.status(500).json({
      error: "Error on adding address information",
      message: err.message,
    });
  }
});
router.post("/post-order", async (req, res) => {
  try {
    const { location, items, paymentOption, orderByEmail, orderByPicture } =
      req.body;
    const order = new OrderModel({
      orderByEmail,
      orderByPicture,
      location,
      items,
      paymentOption,
    });
    const savedInfo = await order.save();
    res.status(201).json(savedInfo);
  } catch (err) {
    res.status(500).json({
      error: "Error on adding order information",
      message: err.message,
    });
  }
});

module.exports = router;
