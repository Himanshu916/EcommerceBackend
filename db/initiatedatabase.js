const mongoose = require('mongoose');

module.exports = function initiatedatabase()
{

    const uri = "mongodb+srv://himanshuRanaDB:aditij@123Hi@himanshurana-cluster.rd9v0.mongodb.net/ECommerce"
    mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // Timeout after 5s instead of 30s
      })



}