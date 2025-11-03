const mongoose = require("mongoose")



const cartSchema = new mongoose.Schema({

        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    name_: {
        type: String,
        required: true
    },
    quantity: {
        type: Number
    },

    productPrice:{
        type:Number
    }, 
    // product
    amount: {
        type: Number
    },
    image: {
        type: String
    }
})

const cartModel = mongoose.model("cart", cartSchema)
module.exports = cartModel