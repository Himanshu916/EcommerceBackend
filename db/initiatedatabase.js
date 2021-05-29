require("dotenv").config()
const mongoose = require('mongoose');


module.exports = function initiatedatabase()
{

    const uri = process.env.MONGODB_URL
    mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
        useFindAndModify:false
        // Timeout after 5s instead of 30s
      },err=> 
      {
        if (err) throw err
        console.log("Connected to mongoDB")
      })



}