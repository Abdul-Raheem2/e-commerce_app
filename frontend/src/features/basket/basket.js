import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchBasket } from "./basketSlice";
import BasketOrderProduct from "../../components/BasketOrderProduct";

export default function Basket(){
    const dispatch = useDispatch();

    const basket = useSelector((state)=>state.basket.basket);
    useEffect(()=>{
        dispatch(fetchBasket());  
    },[dispatch])

    function handleUpdateTotal(e){
        dispatch(fetchBasket());
    }
    return (
        <>
            <p>Total:£{basket.total}</p>
            <button onClick={handleUpdateTotal}>Update Total</button>
            <div>
                {basket.products.map((product)=>{
                    return <BasketOrderProduct product={product} key={product.id}/>
                })}
            </div>
        </>

    )
}