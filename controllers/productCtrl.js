const Products = require("../models/product.model");

const productCtrl = {
getProducts:async (req,res)=>
{
    try{
        const products =await Products.find();
        res.json(products)
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
},
createProduct:async (req,res)=>
{
    try{
        const {product_id,title,price,discount,description,content,categorie,sold,checked,images} = req.body;
     
        const product = await Products.findOne({product_id});
        if(product) return res.status(400).json({message:"product is already exist "})

        const newProduct = new Products({
            product_id,title,price,discount,description,content,categorie,sold,checked,images
        })

        const x= await newProduct.save()
        console.log(x)
        res.json({product_id,title,price,discount,description,content,categorie,sold,checked,images})

    }catch(error)
    {
        res.status(500).json({message:error.message})
    }
},
deleteProduct:async (req,res)=>
{
    try{
        const {productId} = req.params;
        
        await Products.findByIdAndDelete(productId)
        res.json({message:"deleted a product"})
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
},
updateProduct:async (req,res)=>
{
    try
    {
        const {productId} = req.params;
        const {title,price,discount,description,content,categorie,sold,checked,images} = req.body;
        await Products.findOneAndUpdate({_id:productId},{title,price,description,content,categorie,sold,checked,images})
        
        res.json({message:"product updated"})
    }catch(error)
    {
        res,status(500).json({message:error.message})
    }
},
getProduct:async (req,res)=>
{
    try
    {
        const {productId} = req.params;
        const product = await Products.findById(productId)
        res.json(product)

    }catch(error)
    {
        res.status(500).json({message:error.message})
    }
}



}

module.exports = productCtrl;