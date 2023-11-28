import './product.css';
import { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useParams } from "react-router-dom"
import { fetchProduct } from "./productsSlice";
import { addProductToBasket,updateQuantity,removeFromBasket } from '../basket/basketSlice';
import moneyFormatter from '../../utils/money';

export default function Products(){
    const dispatch = useDispatch();
    let {productId} = useParams();


    const [quantity,setQuantity] = useState(1);

    const inBasketMsgRef = useRef(null);
    const inBasketRef = useRef(null);
    const notInBasketRef = useRef(null);

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
        dispatch(removeFromBasket({productId}));
    }
    const product = useSelector((state)=>state.products.product);
    const basket = useSelector((state)=>state.basket.basket.products);

    useEffect(()=>{
        checkInBasket();
    },[product,basket])

    function checkInBasket(){
        const basketIndex = basket.findIndex((basketProduct)=>basketProduct.id===product.id)
        if(basketIndex!==-1){
            inBasketMsgRef.current.style.display = "block";
            inBasketRef.current.style.display = "block";
            notInBasketRef.current.style.display = "none";
            setQuantity(basket[basketIndex].quantity);
        }else{
            inBasketMsgRef.current.style.display = "none";
            inBasketRef.current.style.display = "none";
            notInBasketRef.current.style.display = "block";
            setQuantity(1);
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
                    <p className="product-price">{moneyFormatter(product.price)}</p>
                    <p ref={inBasketMsgRef} id="product-msg">✓ Added to basket</p>
                    <label htmlFor='qty1'>Qty:</label>
                    <input id="qty1" type="number" min="1" value={quantity} onChange={(e)=>{setQuantity(e.target.value)}}/>
                    <button onClick={(e)=>{checkInBasket()}} title='reset'>↺</button>
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