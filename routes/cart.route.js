const express = require('express');
const cartrouter = express.Router();
const Cart = require("../models/cart.model")


cartrouter.route("/cart")
.get(async (req,res)=>
{
    try{
        const data = await Cart.find({});
        console.log(data)
        res.json(data)
    }
    catch
    {
        res.status(400).json({success:"failed",message:"error while getting data"})
    }
})
.post(async (req,res)=>
{
        try
        {
           const data =  await Cart.create(req.body);
            res.json(data)
        }
        catch(err)
        {
            res.send({success:"fail",message:"item is already present in cart"})
        }
  


})
.delete(async (req,res)=>
{
 
try{
    const  product= req.body;
     const data= await Cart.findByIdAndDelete(product._id);
    res.send(data)
}
catch(error)
{
    res.status(400).json({success:"failed",message:"there is no item with this id "})
}
    
     

})
module.exports = cartrouter