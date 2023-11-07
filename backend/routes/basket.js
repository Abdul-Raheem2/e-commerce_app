const express = require('express');
const db = require('../db');
const basketInfo = require('../utils/basket');
const checkAuthenticated = require('../utils/authenticated');

const basketRouter = express.Router({mergeParams:true});


basketRouter.use(checkAuthenticated);

basketRouter.get('/',async (req,res,next)=>{
    try{
        const basket = await db.basketByUserID(req.user.id);
        const info = basketInfo(basket);
        res.json({
            ...info,
            products: basket
        });
    }catch(err){
        next(err);
    }

})

basketRouter.post('/',async (req,res,next)=>{
    try{
        let {productId,quantity} = req.body;
        productId = Number(productId);
        quantity = Number(quantity);
        if(!productId || !quantity){
            return res.status(400).send('product id and quantity required');
        }else if(!Number.isInteger(productId) || !Number.isInteger(quantity) || quantity <0){
            return res.status(400).send('invalid product id or quantity');
        }
        const newProduct = await db.addToBasket(req.user.id,productId,quantity);
        res.status(201).json(newProduct);
    }catch(error){
        if(error.code==='23503'){ //errors from db
            res.status(404).send('invalid product id');
        }else if (error.code ==='23505'){
            res.status(409).send('product already in basket')
        }
        else{next(error)}
    }
})

basketRouter.put('/',async (req,res,next)=>{
    try{
        let {productId,quantity} = req.body;
        productId = Number(productId);
        quantity = Number(quantity);
        if(!productId || !quantity && quantity !==0){
            return res.status(400).send('product id and quantity required');
        }else if(!Number.isInteger(productId) || !Number.isInteger(quantity) || quantity <0){
            return res.status(400).send('invalid product id or quantity');
        }
        if (quantity ===0){
            await db.deleteFromBasket(req.user.id,productId);
            return res.status(204).send();
        }
        const updatedProduct = await db.updateProductQuantity(req.user.id,productId,quantity);
        if(updatedProduct){
            return res.status(200).json(updatedProduct);
        }
        const newProduct = await db.addToBasket(req.user.id,productId,quantity);
        res.status(201).json(newProduct);
    }catch(error){
        if(error.code==='23503'){ //errors from db
            res.status(404).send('invalid product id');
        }
        else{next(error)};
    }
})

basketRouter.delete('/:productId',async (req,res,next)=>{ 
    try{
        let {productId} = req.params;
        productId = Number(productId);
        if(!productId || !Number.isInteger(productId)){
            return res.status(400).send('invalid product id');
        }
        await db.deleteFromBasket(req.user.id,productId);
        res.status(204).send();
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