const mongoose = require("mongoose");
 const {Schema} = mongoose;
 const FoodAndDrinkSchema = new Schema({
    text: String,
    unique: String,
    markedprice: Number,
    discount: Number,
    imgsrc:String
 });

 const FoodAndDrinkItem = mongoose.model("FoodAndDrinkItem",FoodAndDrinkSchema);
 module.exports = FoodAndDrinkItem