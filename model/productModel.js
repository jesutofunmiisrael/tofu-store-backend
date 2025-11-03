const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  image: {
    type: String,
  },
  seller:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
});

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;
