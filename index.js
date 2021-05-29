const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload")
const initiatedatabase = require('./db/initiatedatabase')
const app = express();
const seedrouter = require("./routes/seeddata.route");
const wishlistrouter = require("./routes/wishlist.route");
const productrouter = require("./routes/product.route")
const cartrouter = require("./routes/cart.route")
const userrouter = require("./routes/user.route");
const categorierouter = require("./routes/categorie.route")
// const jwt = require("jsonwebtoken")
const cors = require("cors");



initiatedatabase();
//  just dtarting middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(fileUpload({
  useTempFiles:true
}))
app.use(cors())

// default route
app.get("/",function(req,res){
    res.send({success:true})
})

// mounted router on path /api
app.use("/api",seedrouter);
app.use("/api",wishlistrouter);
app.use("/api",cartrouter);
app.use("/api/products",productrouter)
app.use("/api/user",userrouter)
app.use("/api",categorierouter)

// const users = [
//   {
//       userName:"himanshu",
//       password:"rana"

//   },
//   {
//       userName:"aditi",
//       password:"jaiswal"
//   },
//   {
//       userName:"pratham",
//       password:"sharma"

//   }
// ]

// function checkCredential(req,res,next)
// {
//   const user = req.body;
//   console.log(req.body)
//   const userName = users.find(item=>item.userName === user.userName)
//   if(user.password === userName.password)
//   {
//     const token = jwt.sign({userid:12345},"abrakadabra",{expiresIn:"24h"})
//     req.token = token;
//     return next()
//   }
//   res.status(401).json({success:false,message:"give correct username and password"})

// }

// app.post("/api/login",checkCredential,(req,res)=>
// {
//   const user = req.body
//   res.send({user:user,token:req.token});
  

// })

// if the route is not found
app.use((req, res) => {
    res.status(404).json({ success: false, message: "route not found on server, please check"})
  })
  
  /**
   * Error Handler
   * Don't move
   */
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "error occured, see the errMessage key for more details", errorMessage: err.message})
  })

app.listen(process.env.PORT||5000,function()
{
    console.log("server started  ")
})