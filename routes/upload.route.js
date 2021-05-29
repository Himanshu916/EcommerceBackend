const express=require("express");
const uploadrouter = express.Router();
const cloudinary = require("cloudinary");
const fs = require("fs");
const isAuthorized = require("../middlewares/isAuthorized");
const isAdmin = require("../middlewares/isAdmin");


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})


uploadrouter.route("/upload")
.post(isAuthorized,isAdmin,(req,res)=>
{
    try
    {
        const files = req.files;
        if(!files || Object.keys(files).length===0)
        return res.status(400).json({message:"No file uploaded"})
        const {file} = files;
        if(file.size > 1024*1024)
         {
             removeTmp(file.tempFilePath)
             return res.status(400).json({message:"file size is too large"});}
        if(file.mimetype!=="image/jpeg" && file.mimetype!=="image/png")
       { 
            removeTmp(file.tempFilePath)
           return res.status(400).json({message:"files format is incorrect"})}

        cloudinary.v2.uploader.upload(file.tempFilePath,{folder:"test"},async(error,result)=>
        {
            if(error) throw error;
            removeTmp(file.tempFilePath)
            res.json({public_id:result.public_id,url:result.secure_url})
        })
       
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
})


uploadrouter.post("/destroy",isAuthorized,isAdmin,(req,res)=>
{
    try
    {
        const {public_id} = req.body
        if(!public_id) return res.status(400).json({message:"No image is selected"})
        cloudinary.v2.uploader.destroy(public_id,async(error)=>
        {
            if(error) throw error;
            res.json({message:"deleted"})
        })
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
})

const removeTmp = (path)=>
{
    fs.unlink(path,error=>{
        if(error) throw error
    })
}
module.exports = uploadrouter;