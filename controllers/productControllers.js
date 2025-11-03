const express = require("express");

// const {getAllProduct, getSingleProduct } = require("../router/productRouter")
const productModel = require("../model/productModel");

const addproduct = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No image found",
    });
  }

  try {
    const seller = req.user._id;
    const product = await productModel.create({
      ...req.body,
      image: req.file.path,
      seller,
    });

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "product can not be find",
      });
    }

    res.status(201).json({
      success: true,
      message: "product added succefuly",
      product,
    });
  } catch (error) {
    console.log(error);
  }
};
const getproduct = async (req, res) => {
  try {
    const product = await productModel.find().populate("seller", "name email");
    if (!product) {
      return res.status(400).json({
        success: false,
        messsage: " product not get....",
      });
    }

    res.status(201).json({
      success: true,
      message: "product get sucessfully..",
      productlength: product.length,
      product,
    });
  } catch (error) {
    console.log(error);
  }
};

// productRouter.get("/", getAllProduct)
// productRouter.get("/:id", getSingleProduct)

// module.exports = productRouter

module.exports = { getproduct, addproduct };
