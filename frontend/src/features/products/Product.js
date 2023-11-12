import './product.css';
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

    function handleAddToBasket(e){

    }

    const product = useSelector((state)=>state.products.product);
    return (
        <>
            <Link to='/products'>&lt; Back to all Products</Link>
            <div id="product">
                <div class="product-image" style={{"backgroundColor":product.image}}></div>
                <div class="product-info">
                    <h3 class="product-name">{product.name}</h3>
                    <p class="product-description">{product.description}</p>
                    <p class="product-price">£{product.price}</p>
                    <div id="product-addtobasket-div">
                        <button onClick={handleAddToBasket}>Add to basket</button>
                    </div>
                    <div id="product-updatebasket-div" style={{"display":"none"}}>
                        <input id="qty" type="number" min="1"/>
                        <button>Update Quantity</button>
                        <button>Remove from basket</button> 
                    </div>
                </div>
            </div>
        </>

    )
}