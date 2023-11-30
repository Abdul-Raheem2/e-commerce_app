import styles from './basket.module.css';
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { fetchBasket } from "./basketSlice";
import BasketProduct from '../../components/BasketProduct';
import moneyFormatter from '../../utils/money';

export default function Basket(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const basket = useSelector((state)=>state.basket.basket);
    useEffect(()=>{
        dispatch(fetchBasket());  
    },[dispatch])

    function handleUpdateTotal(e){
        dispatch(fetchBasket());
    }
    return (
        <div>
            <div className={styles.basketInfo}>
                <p>Total:{moneyFormatter(basket.total)}</p>
                <button onClick={handleUpdateTotal}>Update Total</button>
                <button onClick={()=>{navigate('/checkout')}}>Checkout</button>
            </div>

            <div className={styles.basketProducts}>
                {basket.products.map((product)=>{
                    return <BasketProduct product={product} key={product.id}/>
                })}
            </div>
        </div>

    )
}