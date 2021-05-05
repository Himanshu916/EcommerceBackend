const express = require('express');
const seedrouter = express.Router();
const SportsItem = require("../models/SportsItem.model");
const FoodAndDrinkItem = require("../models/FoodAndDrinkItem.model");
const GymEssentialItem = require("../models/GymEssentialItem.model");
const ShoesItem = require("../models/ShoesItem.model");
const SupplementItem = require("../models/SupplementItem.model");

seedrouter.route("/sportsitems")
.get(async (req,res)=>
{
    try{
        const sportsitems = await SportsItem.find({});
    res.send(sportsitems)
    }
   catch{res.status(400).json({success:failure,message:"error while getting data"})}
})

seedrouter.route("/foodanddrinks")
.get(async function(req,res){
    try{
        const foodanddrinkitems = await FoodAndDrinkItem.find({});
        res.json(foodanddrinkitems)
    }
    catch(error)
    {
        res.status(400).json({success:"failure",message:"error while getting data"})
    }
})

seedrouter.route("/gymessentials")
.get(async function(req,res){
    try{
        const gymessentialitems = await GymEssentialItem.find({});
        res.json(gymessentialitems)
    }
    catch(error)
    {
        res.status(400).json({success:"failure",message:"error while getting data"})
    }
})

seedrouter.route("/shoesitems")
.get(async function(req,res){
    try{
        const shoesitems = await ShoesItem.find({});
        res.json(shoesitems)
    }
    catch(error)
    {
        res.status(400).json({success:"failure",message:"error while getting data"})
    }
})

seedrouter.route("/supplements")
.get(async function(req,res){
    try{
        const supplementitems = await SupplementItem.find({});
        res.json(supplementitems)
    }
    catch(error)
    {
        res.status(400).json({success:"failure",message:"error while getting data"})
    }
})


module.exports = seedrouter