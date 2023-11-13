import './displayProducts.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function DisplayProduct({product}){
    const navigate = useNavigate();
    function handleClick(e){
        //go to single product page
        navigate(`/products/${product.id}`)
    }
    return (
        <div id="display-product" onClick={handleClick}>
            <div className="product-image" style={{"backgroundColor":product.image}}></div>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">£{product.price}</p>
        </div>
    )
}