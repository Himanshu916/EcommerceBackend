const mongoose = require("mongoose");
const {Schema} = mongoose;



const userSchema = new Schema({
    name:{
        type:String,
        required:"please enter your name",
        trim:true
    },
    email:{
        type:String,
        required:"please enter your email",
       unique:true  
    },
    password:{
        type:String,
        required:"please enter your password",
    },
    wishList:[
        {
            wishitem:{type:Schema.Types.ObjectId,ref:"Products"}
        }
    ],
    cartItems:[
        {
            quantity:Number,
            cartitem:{type:Schema.Types.ObjectId,ref:"Products"}
        }
    ],
    role:{
        type:Number,
        default:0
    }
},{timestamps:true})

const Users = mongoose.model("user",userSchema);
module.exports = Users;