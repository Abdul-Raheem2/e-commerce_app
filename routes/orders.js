const express = require('express');
const db = require('../db');
const checkAuthenticated = require('../utils/authenticated');

const basketRouter = express.Router({mergeParams:true});

basketRouter.use(checkAuthenticated);

basketRouter.get('/',async (req,res,next)=>{
    const orders = await db.allOrders(req.user.id);
    res.json(orders);
})

basketRouter.get('/:orderId',async (req,res,next)=>{
    const orderDetails = await db.orderDetails(req.user.id,req.params.orderId);
    if(orderDetails){res.json(orderDetails);}
    else{res.status(400).send('Invalid order Id');}
})
module.exports = basketRouter;
