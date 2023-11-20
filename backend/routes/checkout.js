const express = require('express');
const db = require('../db');
const checkAuthenticated = require('../utils/authenticated');

const checkoutRouter = express.Router({mergeParams:true});

checkoutRouter.post(checkAuthenticated,'/', async (req,res,next)=>{
    const {paymentInfo} = req.body;

    const basket = await db.basketById(req.session.basketId);
    const info = basketInfo(basket);
    const order = await db.newOrder(req.user.id,info.numProducts,info.total);
    //process payment
    const values = basket.map((product)=>{
        return([`${order.id}`,`${product.product_id}`,`${product.quantity}`]);
    });
    await db.addProductsToOrder(values);
    await db.deleteBasket(req.session.basketId);
    res.send();
});

module.exports = checkoutRouter;