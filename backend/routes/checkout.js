const express = require('express');
const db = require('../db');
const checkAuthenticated = require('../utils/authenticated');

const {checkBasket} = require('../utils/basket');


const stripe = require('stripe')(process.env.STRIPE_SECRET);

const checkoutRouter = express.Router({mergeParams:true});

checkoutRouter.use(checkAuthenticated);

checkoutRouter.post('/create-checkout-session',checkBasket,async (req,res,next)=>{
    try{
        const basket = await db.basketById(req.session.basketId);
        let numProducts = 0;
        const baksetProductsData = basket.map((product) => {
            numProducts+=Number(product.quantity);
            return {
                price_data: {
                    currency: 'gbp',
                    product_data: {
                        name: product.name,
                    },
                    unit_amount: product.price,
                },
                quantity: product.quantity,
            }
        });
        if(numProducts){
            const session = await stripe.checkout.sessions.create({
                line_items: baksetProductsData,
                mode: 'payment',
                ui_mode: 'embedded',
                return_url: `checkout/payment-return?session_id={CHECKOUT_SESSION_ID}`,
                customer_email: req.user.email,
                metadata:{
                    userId:req.user.id,
                    basketId:req.session.basketId,
                    numProducts,
                }
            });
            res.send({clientSecret: session.client_secret});
        }else{ //basket empty
            res.status(400).send();
        }

    }catch(err){
        next(err);
    }

})

checkoutRouter.get('/session-status', async (req, res,next) => {
    try{
        const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
        res.send({
            status: session.status,
        });
    }catch(err){
        next(err);
    }

});

module.exports = checkoutRouter;