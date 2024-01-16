const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
require("dotenv").config();
const route = require("./routes/route")

const app = express();

mongoose.connect(process.env.MONGO_URL);

//Middleware

app.use(express.json())
app.use(cors())
app.use("/", route)

app.get("/", (req, res) => {
  res.send("Hello node");
});

app.listen(process.env.PORT, () => {
  console.log(`https://localhost:${process.env.PORT}`);
});
