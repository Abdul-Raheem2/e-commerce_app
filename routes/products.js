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

productRouter.get('/:productId',async (req,res,next)=>{
    try{
        const product = await db.productById(req.params.productId);
        res.json(product);
    }catch(error){
        next(error);
    }
})

module.exports = productRouter;