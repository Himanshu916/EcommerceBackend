const mongoose = require('mongoose');
const {Schema} = mongoose;

const ShoesSchema = new Schema({
    text: String,
    unique: String,
    markedprice: Number,
    discount: Number,
    imgsrc:String
})

const ShoesItem = mongoose.model("ShoesItem",ShoesSchema);
module.exports = ShoesItem