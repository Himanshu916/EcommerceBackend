const Users = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const Products = require("../models/product.model")
// const { findById } = require("../models/user.model");

const userCtrl = {
register:async (req,res)=>{
                try{
                    const {email,password,name} = req.body;
                    const user = await Users.findOne({email})
                    if(user) return res.status(400).json({message:"The email already exists "})
                    if(password.length < 6) return res.status(400).json({message:"Password should have atleast 6 characters"})


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
                    // const refreshtoken = createRefreshToken({id:newUser._id})
                    // res.cookie('refreshtoken',refreshtoken,{
                    //     httpOnly:true,
                    //     path:"/api/user/refresh_token"

                    // })

                   
                    res.json({accesstoken})
                }
                catch(error)
                {
                    res.status(500).json({message:error.message})
                }
        },
// refreshtoken:(req,res)=>
//         {
//             try{
//                 const rf_token= req.cookies.refreshtoken;
//                 console.log(rf_token);
                
//             if(!rf_token) return res.status(400).json({message:"please login or register"});
//             jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET_KEY,(err,user)=>
//             {
//                 if(err) return res.status(400).json({message:"please login or djehdjehregister"});
//                 const accesstoken = createAccessToken({id:user.id})

//                 res.json({accesstoken})
//             })
//             }catch (error)
//             {
//                 res.status(500).json({message:error.message})
//             }
            

//         },
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
        // const refreshtoken = createRefreshToken({id:user._id});
        // res.cookie("refreshtoken",refreshtoken,{
        //     httpOnly:true,
        //     path:"http://localhost:5000/api/user/refresh_token"
        // })
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
},
addCart:async (req,res)=>
{
    try
    {
        const {id} = req.user;
        console.log(id)
        const user = await Users.findById(id);
        if(!user) res.status(400).json({message:"user doesn't exist"});
       
        console.log(user)

       const x=  await Users.findOneAndUpdate({_id:id},{cartItems:[...user.cartItems,req.body.cart]})
   

        return res.json({message:"added to cart"})

    }catch(error)
    {
        res.status(500).json({message:error.message})
    }
},
removeFromCart:async(req,res)=>
{
    try{
        const {id} = req.user;
        const user = await Users.findById(id);
        if(!user) res.status(400).json({message:"user doesn't exist"});

        const updatedCartItems = user.cartItems.filter(item=>item._id !==req.body.cart._id )
        await Users.findOneAndUpdate({_id:id},{cartItems:updatedCartItems})

        res.json({message:"product removed"})

    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }

},
addToWishList:async(req,res)=>
{
    try{
        const {id} = req.user;
        console.log(id)
        const user = await Users.findById(id);
        if(!user) res.status(400).json({message:"user doesn't exist"});
        console.log(req.body.wishItem);
       
        console.log(user)
        await Users.findOneAndUpdate({_id:id},{wishList:[...user.wishList,req.body.wishItem]})
        
        res.json({message:"added to wishlist"})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
},
updateQuantity:async(req,res)=>
{
    try
    {
        const {id} = req.user;

        const user = await Users.findById(id);
        if(!user) res.status(400).json({message:"user doesn't exist"});
  
      const cartItems = user.cartItems.map((item) => {
        const amount = req.body.type == "increase" ? 1:-1 
    
            if (item._id ===req.body.id)
            return { ...item, quantity: item.quantity + amount};
          return item;
       
            })
          
     

     await Users.findOneAndUpdate({_id:id},{cartItems})
  

        return res.json({message:"quantity updated"})

    }catch(error)
    {
        res.status(500).json({message:error.message})
    }
},
removeFromWishList:async(req,res)=>
{
    try{
        const {id} = req.user;
        const user = await Users.findById(id);
        if(!user) res.status(400).json({message:"user doesn't exist"});

        const updatedWishList = user.wishList.filter(item=>item._id !==req.body.wishItem._id )
        await Users.findOneAndUpdate({_id:id},{wishList:updatedWishList})

        res.json({message:"product removed"})

    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }

},
}


function createAccessToken(user)
{
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:"1d"})

}
// function createRefreshToken(user)
// {
//     return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET_KEY,{expiresIn:"7d"})

// }

module.exports = userCtrl;