
import { useEffect, useState } from "react";


export function Product({product}){
    const [quantity,setQuantity] = useState(0);
    const [InBasket,setInBasket] = useState(false);
    function handleClick(e){
        //go to single product page
    }
    async function handleAddToBasket(e){
        e.stopPropagation();
        setQuantity(1);

    }
    function handleQuantityChange(e){
        e.stopPropagation();
        setQuantity(Number(e.target.value));
        
    }
    useEffect(()=>{
        console.log(quantity);
        if(quantity===0){
            setInBasket(false);
        }else{
            setInBasket(true);
        }
    },[quantity])
    return (
        <div id="product" onClick={handleClick}>
            <div id="product-image" style={{"backgroundColor":product.image}}></div>
            <h3 id="product-name">{product.name}</h3>
            <p id="product-price">£{product.price}</p>
            {InBasket ? <input id="product-quantity" type="number" value={quantity} onChange={handleQuantityChange} min="0"/>
            : <button id="add-product-to-basket-btn" onClick={handleAddToBasket}>Add to Basket</button>}
        </div>
    )
}