const cartModel = require("../model/cartModel")

const AddToCart = async (req, res) =>{
    const user = req.user._id

    const {quantity, productPrice, }  = req.body
    

    try {
        const cartItem = await cartModel.create({
            user, ...req.body, amount:quantity * productPrice
        })
        res.status(201).json({
           messsage:"Item added to cart successfully" ,
           data:cartItem
        })
    } catch (error) {
        console.log(error);
        
    }
}


const getMyCartItem = async (req, res) =>{
    const user = req.user._id

    try {
        const cartItem = await cartModel.find({user})
        res.status(200).json({
         messsage:"Cart item fetched successfully",
         data: cartItem
        })
 
    } catch (error) {
        console.log(error);
        
    }
}


const incrementCarItemQuantity = async (req, res) =>{
    const user = req.user._id
    const itemId = req.params.id;
   


    try {
      const cartItem = await cartModel.findById(itemId);
      
      if(!cartItem){
        return res.status(404).json({
            messsage:"item not found in cart",
            success:false
        })
      }

      cartItem.quantity += 1;
      cartItem.amount = cartItem.quantity * cartItem.productPrice
      await cartItem.save()
      res.status(200).json({
        messsage:"Cart item quantity incremente successfully",
        data:cartItem
      })
    } catch (error) {
        console.log(error);
        
    }
}



const DecerementCarItemQuantity = async (req, res) =>{
    const itemId = req.params.id;

    try {
      const cartItem = await cartModel.findById(itemId);
      
      if(!cartItem){
        return res.status(404).json({
            messsage:"item not found in cart",
            success:false
        })
      }
cartItem.quantity -= 1;
      await cartItem.save()

      
      res.status(200).json({
        messsage:"Cart item quantity Decerement successfully",
        data:cartItem
      })
   
      


    } catch (error) {
        console.log(error);
        
    }
}



module.exports = {AddToCart, getMyCartItem,incrementCarItemQuantity, DecerementCarItemQuantity}