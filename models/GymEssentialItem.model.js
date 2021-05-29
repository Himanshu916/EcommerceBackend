const mongoose = require('mongoose');
const {Schema} = mongoose;
const GymEssentialSchema = new Schema({
    text: String,
    unique: String,
    markedprice: Number,
    discount: Number,
    imgsrc:String
});

const GymEssentialItem= mongoose.model("GymEssentialItem",GymEssentialSchema);
module.exports = GymEssentialItem