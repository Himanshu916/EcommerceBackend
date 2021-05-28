const express = require("express");
const userrouter = express.Router();
const jwt = require("jsonwebtoken");

const userlogger=function(req,res,next)
{
    console.log("user is logged");
    next()
}

const isAuthorized = function(req,res,next)
{
    const token = req.headers.authorization;
    try
    {
        const decoded = jwt.verify(token,"abrakadabra")
        req.user = {userid:decoded.userid}
        next();
        
    }
    catch (error)
    {
        res.status(401).json({success:false,message:"please give the token"})
    }
    // if(token === "himanshu")
    // {
    //     return next()
    // }
        
    
    
}

userrouter.route("/user")
.get(isAuthorized,userlogger,(req,res)=>
{
    res.send({name:"Himanshu Rana",age:23,pincode:201002})
})

module.exports = userrouter;