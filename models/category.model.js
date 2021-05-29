const mongoose = require("mongoose");
const {Schema} = mongoose;

const CategorySchema = new Schema({
    name:{
        type:String,
        trim:true,
        unique:true,
        required:"please give a name for a category"
    }
},{timestamps:true})

const Categories = mongoose.model("categorie",CategorySchema);
module.exports = Categories