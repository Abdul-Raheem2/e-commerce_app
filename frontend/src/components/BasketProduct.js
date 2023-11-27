import './basketProduct.css';
import {useState } from "react"
import { useDispatch } from "react-redux";
import { removeFromBasket, updateQuantity } from "../features/basket/basketSlice";
import moneyFormatter from '../utils/money';

export default function BasketProduct({product}){
    const dispatch = useDispatch();
    const [quantity,setQuantity] = useState(product.quantity);

    function handleUpdateQuantity(e){
        dispatch(updateQuantity({productId:product.id,quantity}));
    }
    function handleRemoveFromBasket(e){
        dispatch(removeFromBasket({productId:product.id}))
    }
    return (
        <div id="basket-product">
            <div className="product-image" style={{"backgroundColor":product.image}}></div>
            <div className='product-info'>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{moneyFormatter(product.price)}</p>
            </div>
            <div className='product-options'>
                <div className='quantity-selector'>
                    <label htmlFor="qty2">Qty:</label>
                    <input id="qty2" type="number" value={quantity} onChange={(e)=>{setQuantity(e.target.value)}} min="1"></input>
                    <button onClick={(e)=>{setQuantity(product.quantity)}} title='reset'>↺</button>
                </div>
                <button className='update-quantity' onClick={handleUpdateQuantity}>Update Quantity</button>
                <button className='remove-from-basket' onClick={handleRemoveFromBasket}>Remove From Basket</button>
            </div>

        </div>
    )
}