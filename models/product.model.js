const mongoose = require("mongoose");
const {Schema} = mongoose;


const ProductSchema = new Schema({
product_id:{
    type:String,
    unique:true,
    require:true,
    trim:true
},
title:{
    type:String,
    required:"please provide the title",
    trim:true

},
discount:{
    type:Number,
    required:"please mention the discount on product"
},
price:{
    type:Number,
    required:"please provide the price",
    trim:true
},
description:{
    type:String,
    required:"please provide the description"
},
content:{
    type:String,
    required:"please provide the content"
},
categorie:{
    type:String,
    required:"please provide the categorie"
},
sold:{
    type:Number,
    default:0
},
checked:{
    type:Boolean,
    default:false
},
images:{
    type:Object,
    required:"please upload product images"
}
})



const Products = mongoose.model("product",ProductSchema);
module.exports = Products;