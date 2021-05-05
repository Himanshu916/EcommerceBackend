const mongoose = require("mongoose");
const {Schema} = mongoose;
const SupplementSchema = new Schema({
    text: String,
    unique: String,
    markedprice: Number,
    discount: Number,
    imgsrc:String
});


const SupplementItem = mongoose.model("Supplement",SupplementSchema);
module.exports = SupplementItem