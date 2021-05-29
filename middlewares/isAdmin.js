const Users = require("../models/user.model")
const isAdmin=async (req,res,next)=>
{
    try
    {

        const user = await Users.findOne({_id:req.user.id})
        if(user.role===0)
        return res.status(400).json({message:"Admin resource access denied"})
        next()
    }
    catch(error)
    {
        res.json({message:error.message})
    }
}
module.exports = isAdmin;