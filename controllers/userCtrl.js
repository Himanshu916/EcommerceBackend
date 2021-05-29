const Users = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const userCtrl = {
register:async (req,res)=>{
                try{
                    const {email,password,name} = req.body;
                    const user = await Users.findOne({email})
                    if(user) return res.json({message:"The email already exists "})
                    if(password.length < 6) return res.json({message:"Password should have atleast 6 characters"})


                    // Password Encryption
                    const passwordHash = await bcrypt.hash(password,10)

                    // creating user
                    const newUser = new Users({
                        name,
                        email,
                        password:passwordHash
                    })
                    
                    // saving to database
                    await newUser.save()
            
                    // creating token for authentication
                    const accesstoken = createAccessToken({id:newUser._id})
                    const refreshtoken = createRefreshToken({id:newUser._id})
                    res.cookie('refreshtoken',refreshtoken,{
                        httpOnly:true,
                        path:"/api/user/refresh_token"

                    })

                   
                    res.json({accesstoken})
                }
                catch(error)
                {
                    res.status(500).json({message:error.message})
                }
        },
refreshtoken:(req,res)=>
        {
            try{
                const rf_token= req.cookies.refreshtoken;
                
            if(!rf_token) return res.status(400).json({message:"please login or register"});
            jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET_KEY,(err,user)=>
            {
                if(err) return res.status(400).json({message:"please login or register"});
                const accesstoken = createAccessToken({id:user.id})

                res.json({accesstoken})
            })
            }catch (error)
            {
                res.status(500).json({message:error.message})
            }
            

        },
login:async(req,res)=>
{
    try
    {
        const {email,password} = req.body;
        const user = await Users.findOne({email});
        if(!user) return res.status(400).json({message:"the email does not exist"})
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"password does'not match."})

        // if login then create access token and refresh token
        const accesstoken = createAccessToken({id:user._id})
        const refreshtoken = createRefreshToken({id:user._id});
        res.cookie("refreshtoken",refreshtoken,{
            httpOnly:true,
            path:"/api/user/refresh_token"
        })
        res.json({accesstoken})
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
},
logout:async (req,res)=>
{
    try
    {
        res.clearCookie("refreshtoken",{path:"/api/user/refresh_token"})
        return res.json("logged out")
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
},
getUser:async(req,res)=>
{
   try
   {    // const {user} = req;   
       const user = await Users.findById(req.user.id).select("-password");
       if(!user) return res.status(400).json({message:"user does not exist"})
       res.json(user)

   }
   catch(error)
   {
       res.status(500).json({message:error.message})
   }
}
}


function createAccessToken(user)
{
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:"1d"})

}
function createRefreshToken(user)
{
    return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET_KEY,{expiresIn:"7d"})

}

module.exports = userCtrl;