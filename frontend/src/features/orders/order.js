import styles from './orders.module.css';

import { useDispatch} from "react-redux";

import { fetchOrdersDetails } from './orderSlice';

import moneyFormatter from "../../utils/money";
import { FaAngleDown,FaAngleUp } from "react-icons/fa";
import { useState } from 'react';

export default function Order({order}){
    const dispatch = useDispatch();

    const [expanded,setExpanded] = useState(false);

    const orderDate = new Date(order.order_date).toString();

    function handleExtendClick(e){
        dispatch(fetchOrdersDetails({orderId:order.id}));
        setExpanded(true);
    }
    function handleCollapseClick(e){
        setExpanded(false);
    }

    return (
        <div className={styles.order}>
            <div className={styles.orderInfo}>
                <p>order number: {order.id}</p>
                <p>order total: {moneyFormatter(order.total_cost)}</p>
                <p>products: {order.num_products}</p>
                <p>order date: {orderDate}</p>
                <p>status: {order.status}</p>
                {expanded ?<span onClick={handleCollapseClick}><FaAngleUp className={styles.icon}/></span>
                :<span onClick={handleExtendClick}><FaAngleDown className={styles.icon}/></span>}
            </div>
            {expanded && <div className={styles.orderDetails}>
                {order.products && order.products.map((product)=>{
                    return (
                    <div key={product.product_id}>
                        <p>{product.name}</p>
                        <p>qty: {product.quantity}</p>
                        <p>{moneyFormatter(product.price)} x {product.quantity} = {moneyFormatter(product.price*product.quantity)}</p>
                    </div>)
                })}
            </div>}
        </div>

    )
}