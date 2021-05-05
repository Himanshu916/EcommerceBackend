const mongoose = require('mongoose');
const {Schema} = mongoose;

const wishListSchema = new Schema({
    text: String,
    unique: String,
    markedprice: Number,
    discount: Number,
    imgsrc:String
});
const WishList = mongoose.model("WishList",wishListSchema);
module.exports = WishList;