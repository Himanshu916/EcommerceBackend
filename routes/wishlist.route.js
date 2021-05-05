const express = require("express");
const wishlistrouter = express.Router();
const WishList = require("../models/WishList.model");



wishlistrouter.route("/wishlist")
.get(async (req,res)=>
{
    try
    {
        const data = await WishList.find({});
        res.json(data)
    }
    catch(error)
    {
        res.status(400).json({success:false,message:"unable to get data from wishlist"})
    }


})
.post(async (req,res)=>
{
   try
    {
        const data = await WishList.create(req.body)
        res.json(data);
    }
    catch(error)
    {
     
        res.send({sucess:"failed",message:"item is already present in wishlist"})
    }
})
.delete(async (req,res)=>
{
 
try{
    const  product= req.body;
     const data = await WishList.findByIdAndDelete(product._id)
    res.send(data)
}
catch(error)
{
    res.status(400).json({success:"failed",message:"there is no item with this id "})
}
    
     

})

module.exports = wishlistrouter;