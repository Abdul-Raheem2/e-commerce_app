const express = require('express');
const db = require('../db');
const basketInfo = require('../utils/basket');

const basketRouter = express.Router({mergeParams:true});

basketRouter.get('/',async (req,res,next)=>{
    try{
        if(req.isAuthenticated()){
            const basket = await db.basketByUserID(req.user.id);
            const info = basketInfo(basket);
            res.json({
                ...info,
                basket: basket
            });
        }else{
            res.status(401).send('log in first');
        }
    }catch(error){
        next(error);
    }

})

basketRouter.post('/',async (req,res,next)=>{
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
            const newProduct = await db.addToBasket(req.user.id,product_id,quantity);
            res.status(201).json(newProduct);
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
            if (quantity ===0){
                await db.deleteFromBasket(req.user.id,product_id);
                return res.status(204).send();
            }
            const updatedProduct = await db.updateProductQuantity(req.user.id,product_id,quantity);
            if(updatedProduct){
                return res.status(200).json(updatedProduct);
            }
            const newProduct = await db.addToBasket(req.user.id,product_id,quantity);
            res.status(201).json(newProduct);
        }else{
            res.status(401).send('log in first');
        }
    }catch(error){
        next(error);
    }
})

basketRouter.delete('/:product_id',async (req,res,next)=>{ 
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

basketRouter.post('/checkout', async (req,res,next)=>{
    const {paymentInfo} = req.body;

    const basket = await db.basketByUserID(req.user.id);
    const info = basketInfo(basket);
    const order = await db.newOrder(req.user.id,info.numProducts,info.total);
    //process payment
    const values = basket.map((product)=>{
        return([`${order.id}`,`${product.product_id}`,`${product.quantity}`]);
    });
    await db.addProductsToOrder(values);
    await db.deleteBasket(req.user.id);
    res.send('order created');
})

module.exports = basketRouter;