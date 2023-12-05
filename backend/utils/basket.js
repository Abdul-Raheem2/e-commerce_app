const db = require('../db');

async function checkBasket(req,res,next){
    if(!req.session.basketId){
        if(req.isAuthenticated()){
            const newBasket = await db.newBasket(req.user.id);
            req.session.basketId = newBasket.id;
        }else{
            const newBasket = await db.newBasket(null);
            req.session.basketId = newBasket.id;
        }
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
        total:total,
    }
}

module.exports = {
    basketInfo,
    checkBasket
};