
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SportsSchema = new Schema({

        text: String,
        unique: String,
        markedprice: Number,
        discount: Number,
        imgsrc:String
      
});
const SportsItem = mongoose.model("SportsItem",SportsSchema)

module.exports = SportsItem;