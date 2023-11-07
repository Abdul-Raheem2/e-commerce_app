import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { fetchBasket } from "./basketSlice";

export default function Basket(){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchBasket());  
    },[dispatch])
    return (
        <p>Basket Page</p>
    )
}