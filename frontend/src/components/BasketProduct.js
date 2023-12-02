import styles from './basketProduct.module.css';
import {useState } from "react"
import { useDispatch } from "react-redux";
import { removeFromBasket, updateQuantity } from "../features/basket/basketSlice";
import moneyFormatter from '../utils/money';
import { useNavigate } from 'react-router-dom';

export default function BasketProduct({product}){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quantity,setQuantity] = useState(product.quantity);

    function handleProductClick(e){
        navigate(`/products/${product.id}`);
    }
    function handleUpdateQuantity(e){
        e.stopPropagation();
        dispatch(updateQuantity({productId:product.id,quantity}));
    }
    function handleRemoveFromBasket(e){
        e.stopPropagation();
        dispatch(removeFromBasket({productId:product.id}))
    }
    function handleQtyReset(e){
        e.stopPropagation();
        setQuantity(product.quantity);
    }
    return (
        <div className={styles.basketProduct} >
            <div className={styles.productImg} style={{"backgroundColor":product.image}} onClick={handleProductClick}></div>
            <div className={styles.productInfo} onClick={handleProductClick}>
                <h3>{product.name}</h3>
                <p>{moneyFormatter(product.price)} x {product.quantity} = {moneyFormatter(product.price*product.quantity)}</p>
            </div>
            <div className={styles.productOptions}>
                <div className={styles.productQtyDiv}>
                    <label htmlFor="qty2">Qty:</label>
                    <input className={styles.productQtyInput} id="qty2" type="number" value={quantity} onClick={e=>e.stopPropagation()} onChange={(e)=>{setQuantity(e.target.value)}} min="1"></input>
                    <button onClick={handleQtyReset} title='reset'>↺</button>
                </div>
                <button className={styles.productOptionBtn} onClick={handleUpdateQuantity}>Update Quantity</button>
                <button className={styles.productOptionBtn} onClick={handleRemoveFromBasket}>Remove From Basket</button>
            </div>

        </div>
    )
}