
import { useDispatch } from "react-redux";
import { useState } from "react";

import { updateQuantity} from "../features/products/productsSlice";

export function Product({product}){
    const [quantity,setQuantity] = useState(0);
    const dispatch = useDispatch();
    function handleClick(e){
        //go to single product page
    }
    async function handleAddToBasket(e){
        e.stopPropagation();
        //dispatch(addProductToBasket(product.id));
        //dispatch(updateQuantity({id:product.id,quantity:1}))
        //setQuantity(1);
    }
    function handleQuantityChange(e){
        dispatch(updateQuantity({id:product.id,quantity:e.target.value}));
        setQuantity(product.quantityInBasket);
        console.log(quantity);
    }
    return (
        <div id="product" onClick={handleClick}>
            <div id="product-image" style={{"backgroundColor":product.image}}></div>
            <h3 id="product-name">{product.name}</h3>
            <p id="product-price">£{product.price}</p>
            {quantity===0 ? <button id="add-product-to-basket-btn" onClick={handleAddToBasket}>Add to Basket</button>
            :<input id="product-quantity" type="number" value={product.quantityInBasket} onChange={handleQuantityChange} min="0"/>}
        </div>
    )
}