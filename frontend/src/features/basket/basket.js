import './basket.css';
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
        <div id="basket">
            <div id="basket-info">
                <p>Total:{moneyFormatter(basket.total)}</p>
                <button onClick={handleUpdateTotal}>Update Total</button>
                <button onClick={()=>{navigate('/checkout')}}>Checkout</button>
            </div>

            <div id="basket-products">
                {basket.products.map((product)=>{
                    return <BasketProduct product={product} key={product.id}/>
                })}
            </div>
        </div>

    )
}