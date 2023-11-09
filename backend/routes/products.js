const express = require('express');
const db = require('../db');

const productRouter = express.Router({mergeParams:true});

productRouter.get('/',async (req,res)=>{
    try{
        if(req.query.category){
            const categoryProducts = await db.productsByCategory(req.query.category);
            res.json(categoryProducts);
        }else{
            const products = await db.allProducts();
            res.json(products);
        }
    }catch(error){
        next(error);
    }
})

productRouter.get('/categories',async (req,res,next)=>{
    try{
        const categories = await db.categories();
        res.json(categories.map((category)=>category.category));
    }catch(error){
        next(error);
    }
})

productRouter.get('/:productId',async (req,res,next)=>{
    try{
        let {productId} = req.params;
        productId = Number(productId);
        if(!productId || !Number.isInteger(productId)){
            return res.status(400).send('invalid product id');
        }
        const product = await db.productById(productId);
        if(product){
            res.json(product);
        }else{
            res.status(404).send();
        }
    }catch(error){
        next(error);
    }
})


module.exports = productRouter;