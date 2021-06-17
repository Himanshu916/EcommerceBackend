const jwt = require("jsonwebtoken")
// const userlogger=function(req,res,next)
// {
//     console.log("user is logged");
//     next()
// }

const isAuthorized = function(req,res,next)
{
   
    try
    {
        const token = req.headers.authorization;
        if(!token) return res.status(400).json({message:"invalid authentication"})
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY,(error,user)=>
        {
            if(error) return res.status(400).json({message:"invalid authentication"})
            req.user = user;
            next();
        })
   
    }
    catch (error)
    {
        res.status(500).json({message:error.message})
    }
    
}

module.exports = isAuthorized;