import './product.css';
import { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useParams } from "react-router-dom"
import { fetchProduct } from "./productsSlice";
import { addProductToBasket,updateQuantity,removeFromBasket } from '../basket/basketSlice';


export default function Products(){
    const dispatch = useDispatch();
    let {productId} = useParams();
    const [quantity,setQuantity] = useState(1);
    const [inBasket,setInBasket] = useState(0);

    const inBasketRef = useRef(null);
    const notInBasketRef = useRef(null);
    const resetRef = useRef(null);

    useEffect(()=>{
        dispatch(fetchProduct(productId));
    },[dispatch,productId]);

    function handleAddToBasket(e){
        dispatch(addProductToBasket({productId,quantity}));
    }
    
    function handleUpdateQuantity(e){
        dispatch(updateQuantity({productId,quantity}));
    }
    function handleRemoveFromBasket(e){
        dispatch(removeFromBasket(productId));
    }
    const product = useSelector((state)=>state.products.product);
    const basket = useSelector((state)=>state.basket.basket.products);

    useEffect(()=>{
        checkInBasket();
    },[product,basket])

    useEffect(()=>{
        if(quantity!=inBasket && !(inBasket==0 && quantity==1)){
            resetRef.current.style.display = "block";
        }else{
            resetRef.current.style.display = "none";
        }
    },[quantity,inBasket])

    function checkInBasket(){
        const basketIndex = basket.findIndex((basketProduct)=>basketProduct.id===product.id);
        if(basketIndex!==-1){
            inBasketRef.current.style.display = "block";
            notInBasketRef.current.style.display = "none";
            setQuantity(basket[basketIndex].quantity);
            setInBasket(basket[basketIndex].quantity)
        }else{
            inBasketRef.current.style.display = "none";
            notInBasketRef.current.style.display = "block";
            setQuantity(1);
            setInBasket(0);
        }
    }
    return (
        <>
            <Link to='/products'>&lt; Back to all Products</Link>
            <div id="product">
                <div className="product-image" style={{"backgroundColor":product.image}}></div>
                <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">£{product.price}</p>
                    <input id="qty" type="number" min="1" value={quantity} onChange={(e)=>{setQuantity(e.target.value)}}/>
                    <button ref={resetRef} onClick={(e)=>{checkInBasket()}}>Reset</button>
                    <div id="product-notinbasket-div" ref={notInBasketRef}>
                        <button onClick={handleAddToBasket}>Add to basket</button>
                    </div>
                    <div id="product-inbasket-div" ref={inBasketRef}>
                        <button onClick={handleUpdateQuantity}>Update Quantity</button>
                        <button onClick={handleRemoveFromBasket}>Remove from basket</button> 
                    </div>
                </div>
            </div>
        </>

    )
}