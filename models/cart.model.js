const mongoose = require('mongoose');
const {Schema} = mongoose;

const CartSchema = new Schema({
    text: String,
    unique: String,
    markedprice: Number,
    discount: Number,
    imgsrc:String,
    quantity:Number
});


const Cart = mongoose.model("Cart",CartSchema);

module.exports = Cart