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
    },[dispatch])

    const orders = useSelector((state)=>state.orders.orders);
    const selectedOrder = useSelector((state)=>state.orders.selectedOrder);
    return (
        <div>
            <h2>Orders</h2>
            <div className={styles.ordersDiv}>
                <div className={styles.orders}>
                    <table className={styles.ordersTable}>
                        <thead>
                            <tr>
                                <th>Order Number</th>
                                <th>Order Date</th>
                                <th>Products</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Order Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order)=>{
                                return <Order order={order} key={order.id} selected={selectedOrder && order.id===selectedOrder.id}/>
                            })}
                        </tbody>
                    </table>
                </div>
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