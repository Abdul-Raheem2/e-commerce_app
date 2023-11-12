import './displayProducts.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function DisplayProduct({product}){
    const navigate = useNavigate();
    const [quantity,setQuantity] = useState(0);
    const [InBasket,setInBasket] = useState(false);
    function handleClick(e){
        //go to single product page
        navigate(`/products/${product.id}`)
    }
    useEffect(()=>{
        if(quantity===0){
            setInBasket(false);
        }else{
            setInBasket(true);
        }
    },[quantity])
    return (
        <div id="display-product" onClick={handleClick}>
            <div class="product-image" style={{"backgroundColor":product.image}}></div>
            <h3 class="product-name">{product.name}</h3>
            <p class="product-price">£{product.price}</p>
        </div>
    )
}