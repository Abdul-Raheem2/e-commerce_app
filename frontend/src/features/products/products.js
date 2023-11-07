import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./productsSlice"
import { useEffect } from "react";

import { Product } from "../../components/Product";

export default function Products(){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchProducts());  
    },[dispatch]);
    const products = useSelector((state)=>state.products.products);
    return (
        <div id="products">
            {products.map((product)=>{
                return <Product product={product} key={product.id}/>
            })}
        </div>
    )
}