const express = require('express');
const db = require('../db');

const basketRouter = express.Router({mergeParams:true});

basketRouter.get('/',async (req,res,next)=>{
    try{
        if(req.isAuthenticated()){
            const basket = await db.basketByUserID(req.user.id);
            res.json(basket);
        }else{
            res.status(401).send('log in first');
        }
    }catch(error){
        next(error);
    }

})

basketRouter.post('/',async (req,res,next)=>{ //add to basket
    try{
        if(req.isAuthenticated()){
            let {product_id,quantity} = req.body;
            product_id = Number(product_id);
            quantity = Number(quantity);
            if(!product_id || !quantity){
                return res.status(400).send('product_id and quantity required');
            }else if(!Number.isInteger(product_id) || !Number.isInteger(quantity) || quantity <0){
                return res.status(400).send('invalid product_id or quantity');
            }
            await db.addToBasket(req.user.id,product_id,quantity);
            res.status(201).send('product added to basket');
        }else{
            res.status(401).send('log in first');
        }
    }catch(error){
        if(error.code==='23503'){ //errors from db
            res.status(400).send('invalid product id');
        }else if (error.code ==='23505'){
            res.status(400).send('product already in basket')
        }
        else{next(error)}
    }
})

basketRouter.put('/',async (req,res,next)=>{
    try{
        if(req.isAuthenticated()){
            let {product_id,quantity} = req.body;
            product_id = Number(product_id);
            quantity = Number(quantity);
            if(!product_id || !quantity && quantity !==0){
                return res.status(400).send('product_id and quantity required');
            }else if(!Number.isInteger(product_id) || !Number.isInteger(quantity) || quantity <0){
                return res.status(400).send('invalid product_id or quantity');
            }
            let updated = false;
            if (quantity ===0){
                await db.deleteFromBasket(req.user.id,product_id);
                updated = true;
            }else{
                updated = await db.updateProductQuantity(req.user.id,product_id,quantity);
            }
            if(updated){res.status(200).send('product quantity updated')}
            else{res.status(400).send('product is not in basket')}
        }else{
            res.status(401).send('log in first');
        }
    }catch(error){
        next(error);
    }
})

basketRouter.delete('/:product_id',async (req,res,next)=>{ //remove from basket
    try{
        if(req.isAuthenticated()){
            let {product_id} = req.params;
            product_id = Number(product_id);
            if(!product_id || !Number.isInteger(product_id)){
                return res.status(400).send('invalid product_id');
            }
            await db.deleteFromBasket(req.user.id,product_id);
            res.status(204).send();
        }else{
            res.status(401).send('log in first');
        }
    }catch(error){
        next(error);
    }
})

module.exports = basketRouter;