
export function Product({product}){
    function handleClick(e){
        //go to single product page
    }
    function handleButtonClick(e){
        e.stopPropagation();
        // add to basket
    }
    return (
        <div id="product" onClick={handleClick}>
            <div id="product-image" style={{"backgroundColor":product.image}}></div>
            <h3 id="product-name">{product.name}</h3>
            <p id="product-price">£{product.price}</p>
            <button id="add-product-to-basket-btn" onClick={handleButtonClick}>Add to Basket</button>
        </div>
    )
}