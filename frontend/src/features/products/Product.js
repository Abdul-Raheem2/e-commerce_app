import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useParams } from "react-router-dom"
import { fetchProduct } from "./productsSlice";


export default function Products(){
    const dispatch = useDispatch();
    let {productId} = useParams();

    useEffect(()=>{
        dispatch(fetchProduct(productId));
    },[dispatch,productId]);

    const product = useSelector((state)=>state.products.product);
    return (
        <div>
            <Link to='/products'>&lt; Back to all Products</Link>
            <div style={{"backgroundColor":product.image,"width":"50px","height":"50px"}}></div>
            <h3 >{product.name}</h3>
            <p>{product.description}</p>
            <p >£{product.price}</p>
            <button>Add to basket</button>
            <br/>
            <input id="qty" type="number" min="1"/>
            <button>Update Quantity</button>
            <br/>
            <button>Remove from basket</button>
        </div>
    )
}