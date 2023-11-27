const express = require('express');
const db = require('../db');

const stripe = require('stripe')(process.env.STRIPESECRET);
const endpointSecret = process.env.STRIPEENDPOINTSECRET;

const stripeRouter = express.Router({mergeParams:true});

async function fulfilOrder(data){
    const order = await db.newOrder(data.metadata.userId,data.metadata.numProducts,data.amount_total,'paid');
    db.copyProductsFromBasketToOrder(data.metadata.basketId,order.id);
    db.deleteBasket(data.metadata.basketId);
}

stripeRouter.post('/',express.raw({type:'application/json'}),async (req, res,next) => {
    try{
        const payload = req.body;
        const sig = req.headers['stripe-signature']; 
        const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        if (event.type === 'checkout.session.completed') {
            fulfilOrder(event.data.object);
        }
        res.status(200).end();
    }catch(err){
        next(err);
    }

});

module.exports = stripeRouter;