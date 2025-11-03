const express = require("express");
const { getproduct, addproduct } = require("../controllers/productControllers");
const isLoggedIn = require("../middleware/isLoggedin");
const productImageUploader = require("../middleware/productImageUpload");

const product = express.Router();
product.get("/getproduct", getproduct);
product.post(
  "/addproduct",
  isLoggedIn,
  (req, res, next) => {
    productImageUploader.single("image")(req, res, (err) => {
      if (err) {
        console.error("Upload Error:", err);
        return res.status(400).json({ success: false, message: err.message });
      }
      next();
    });
  },
  addproduct
);

module.exports = product;
