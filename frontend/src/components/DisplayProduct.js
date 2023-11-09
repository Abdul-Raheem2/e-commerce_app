
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
        <div id="product" onClick={handleClick}>
            <div id="product-image" style={{"backgroundColor":product.image}}></div>
            <h3 id="product-name">{product.name}</h3>
            <p id="product-price">£{product.price}</p>
        </div>
    )
}