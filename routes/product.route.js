const express = require("express");
const productrouter = express.Router();
const SportModel = require("../models/SportsItem.model");
const SupplementModel = require("../models/SupplementItem.model");
const GymEssentialModel = require("../models/GymEssentialItem.model");
const ShoeModel = require("../models/ShoesItem.model");
const FoodAndDrinkModel = require("../models/FoodAndDrinkItem.model");




productrouter.param("productId",async (req,res,next,productId)=>{
try
{
    const product = await SportModel.findById(productId) || await SupplementModel.findById(productId) || await GymEssentialModel.findById(productId) || await ShoeModel.findById(productId) || await FoodAndDrinkModel.findById(productId);
   
    if(!product)
    {
       return res.status(400).json({success:"fail",message:"error"})
    }
    req.product=product;
    next()
}
catch
{
res.status(400).json({success:false,message:"error while retrieving product"})
}

  
})
productrouter.route("/:productId")
.get(async (req,res)=>
{
    const {product}= req;
        res.json(product)
})

module.exports = productrouter;