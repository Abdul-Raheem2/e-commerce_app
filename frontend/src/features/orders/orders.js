import styles from './orders.module.css';
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders} from "./orderSlice";
import moneyFormatter from "../../utils/money";

import Order from './order';    


export default function Orders(){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchOrders());
    },[])

    const orders = useSelector((state)=>state.orders.orders);
    const selectedOrder = useSelector((state)=>state.orders.selectedOrder);
    return (
        <div>
            <h2>Orders</h2>
            <div className={styles.ordersDiv}>
                <table className={styles.ordersTable}>
                    <tr>
                        <th>Order Number</th>
                        <th>Order Date</th>
                        <th>Products</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Order Details</th>
                    </tr>
                    {orders.map((order)=>{
                        return <Order order={order} key={order.id} selected={selectedOrder && order.id===selectedOrder.id}/>
                    })}
                </table>
                <div className={styles.orderDetails}>
                    {selectedOrder && selectedOrder.products.map((product)=>{
                        return (
                            <div className={styles.selectedOrderProduct} key={product.product_id}>
                                <div className={styles.productImg} style={{"backgroundColor":product.image}}></div>
                                <h3 className={styles.productInfo}>{product.name}</h3>
                                <p className={styles.productInfo} >{moneyFormatter(product.price)} x {product.quantity} = {moneyFormatter(product.price*product.quantity)}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}