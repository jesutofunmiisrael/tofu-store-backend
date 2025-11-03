const express = require("express")
const isLoggedIn = require("../middleware/isLoggedin")
const { AddToCart, getMyCartItem, incrementCarItemQuantity, DecerementCarItemQuantity } = require("../controllers/cartController")


const cartRouter = express.Router()

cartRouter.post("/", isLoggedIn, AddToCart)
cartRouter.get("/getcartitem", isLoggedIn, getMyCartItem)
cartRouter.put("/:id", isLoggedIn, incrementCarItemQuantity)
cartRouter.put("/:id/decrease", isLoggedIn, DecerementCarItemQuantity)
module.exports = cartRouter