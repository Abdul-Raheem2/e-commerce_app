import { useEffect, useState,useRef } from "react"
import { useDispatch } from "react-redux";
import { removeFromBasket, updateQuantity } from "../features/basket/basketSlice";

export default function BasketOrderProduct({product}){
    const dispatch = useDispatch();
    const resetRef = useRef(null);
    const [quantity,setQuantity] = useState(product.quantity);
    function handleUpdateQuantity(e){
        dispatch(updateQuantity({productId:product.id,quantity}));
    }
    function handleRemoveFromBasket(e){
        dispatch(removeFromBasket(product.id))
    }
    useEffect(()=>{
        if(quantity!=product.quantity){
            resetRef.current.style.display = "inline-block";
        }else{
            resetRef.current.style.display = "none";
        }
    },[quantity])
    return (
        <div id="basket-order-product">
            <div className="product-image" style={{"backgroundColor":product.image}}></div>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">£{product.price}</p>
            <input type="number" value={quantity} onChange={(e)=>{setQuantity(e.target.value)}} min="0"></input>
            <button onClick={handleUpdateQuantity}>Update Quantity</button>
            <button onClick={(e)=>{setQuantity(product.quantity)}} ref={resetRef}>Reset</button>
            <button onClick={handleRemoveFromBasket}>Remove From Basket</button>
        </div>
    )
}