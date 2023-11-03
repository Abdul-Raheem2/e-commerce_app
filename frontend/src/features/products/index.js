import { useDispatch } from "react-redux";
import { fetchProducts } from "./productsSlice"
import { useEffect } from "react";

export default function Products(){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchProducts());  
    },[]);
    return (
        <p>Products Page</p>
    )
}