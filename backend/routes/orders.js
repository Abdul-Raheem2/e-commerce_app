const express = require('express');
const db = require('../db');
const checkAuthenticated = require('../utils/authenticated');

const basketRouter = express.Router({mergeParams:true});

basketRouter.use(checkAuthenticated);

basketRouter.get('/',async (req,res,next)=>{
    try{
        const orders = await db.allOrders(req.user.id);
        res.json(orders);
    }catch(err){
        next(err);
    }

})

basketRouter.get('/:orderId',async (req,res,next)=>{
    try{
            const orderDetails = await db.orderDetails(req.user.id,req.params.orderId);
        if(orderDetails){res.json(orderDetails);}
        else{res.status(400).send('Invalid order Id');}
    }catch(err){
        next(err);
    }

})
module.exports = basketRouter;
