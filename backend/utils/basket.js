
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

module.exports = basketInfo;