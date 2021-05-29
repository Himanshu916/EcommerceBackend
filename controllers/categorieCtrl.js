const Categories = require("../models/category.model")


const categorieCtrl ={
    getCategories : async (req,res)=>
    {
        try
        {
            const categories = await Categories.find()
            res.json(categories)

        }catch(error)
        {
            res.status(500).json({message:error.message})
        }
    },
    createCategorie:async (req,res)=>
    {
        console.log("id is",req.user.id)
        try{
            const {name} = req.body;
            const categorie = await Categories.findOne({name});
            if(categorie) return res.status(400).json({message:"The category already exists"})
            const newCategorie = new Categories({name})
            await newCategorie.save()
            res.json({message:"created category"})

        }
        catch(error)
        {
            res.status(500).json({message:error.message})
        }

    },
    deleteCategorie:async (req,res)=>
    {
        try
        {
            const {id} = req.params;
            await Categories.findByIdAndDelete(id)
            res.json({message:"deleted a category"})

        }
        catch(error)
        {
            res.status(500).json({messge:error.message})
        }
    },
    updateCategorie:async (req,res)=>
    {
        try
        {
            const {id} =req.params
            const {name}= req.body
            await Categories.findOneAndUpdate({_id:id},{name})
            res.json({message:"updated a category"})
        }
        catch(error)
        {
            res.status(500).json({message:error.message})
        }
    }

}

module.exports = categorieCtrl;