const express = require('express');
const bodyParser = require('body-parser')
const initiatedatabase = require('./db/initiatedatabase')
const app = express();
const seedrouter = require("./routes/seeddata.route");
const wishlistrouter = require("./routes/wishlist.route");
const productrouter = require("./routes/product.route")
const cartrouter = require("./routes/cart.route")
const cors = require("cors");


initiatedatabase();
//  just dtarting middlewares
app.use(bodyParser.json())
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