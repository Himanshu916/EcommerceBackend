const express = require("express");
const userrouter = express.Router();
const userCtrl = require("../controllers/userCtrl")
const isAuthorized = require("../middlewares/isAuthorized")
const cookieParser = require("cookie-parser");
userrouter.use(cookieParser())
 
userrouter.route("/register")
.post(userCtrl.register)

userrouter.post("/login",userCtrl.login);

// userrouter.get("/refresh_token",userCtrl.refreshtoken)

userrouter.get("/logout",userCtrl.logout)

userrouter.get("/infor",isAuthorized,userCtrl.getUser)
userrouter.patch("/addCart",isAuthorized,userCtrl.addCart)
userrouter.patch("/updateQuantity",isAuthorized,userCtrl.updateQuantity)
userrouter.patch("/removeFromCart",isAuthorized,userCtrl.removeFromCart)
userrouter.patch("/addToWishList",isAuthorized,userCtrl.addToWishList)
userrouter.patch("/removeFromWishList",isAuthorized,userCtrl.removeFromWishList)



// userrouter.route("/refresh_token")
// .post(userCtrl.refreshtoken)
// .get(userCtrl.refreshtoken)



































// userrouter.route("/user")
// .get(isAuthorized,userlogger,(req,res)=>
// {
//     res.send({name:"Himanshu Rana",age:23,pincode:201002})
// })




module.exports = userrouter;




