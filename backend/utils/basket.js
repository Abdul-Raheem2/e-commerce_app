const db = require('../db');

async function checkBasket(req,res,next){
    if(!req.session.basketId){
        let newBasket;
        if(req.isAuthenticated()){
            newBasket = await db.newBasket(req.user.id);
        }else{
            newBasket= await db.newBasket(null);
        }
        req.session.basketId = newBasket.id;
    }
    next();
}

function basketInfo(basket){
    let total = 0;
    let numProducts=0;
    basket.forEach((product) => {
        numProducts+=Number(product.quantity);
        total += Number(product.price) * Number(product.quantity);
    })
    return {
        numProducts:numProducts,
        total:total.toFixed(2),
    }
}

module.exports = {
    basketInfo,
    checkBasket
};