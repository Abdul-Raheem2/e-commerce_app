const db = require('../db');

async function checkBasket(req,res,next){
    if(!req.session.basketId){
        console.log(req.cookies.basketId);
        if(req.isAuthenticated()){
            const userBasket = await db.checkUserBasket(req.user.id);
            if(userBasket){
                if(req.cookies.basketId){
                    await db.combineBaskets(userBasket.id,req.cookies.basketId);
                }
                req.session.basketId = userBasket.id;
            }else{
                if(req.cookies.basketId){
                    db.setUserBasket(req.user.id,req.cookies.basketId);
                    req.session.basketId = req.cookies.basketId;
                }else{
                    const newBasket = await db.newBasket(req.user.id);
                    req.session.basketId = newBasket.id;
                }
            }
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