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

async function setUserBasket(oldBasketId,userId){
    const userBasket = await db.checkUserBasket(userId);
    if(userBasket){
        if(oldBasketId){
            await db.combineBaskets(userBasket.id,oldBasketId);
        }
        return userBasket.id;
    }
    if(oldBasketId){
        await db.setUserBasket(userId,oldBasketId);
        return oldBasketId;
    }
    const newBasket = await db.newBasket(userId);
    return newBasket.id;
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
    checkBasket,
    setUserBasket
};