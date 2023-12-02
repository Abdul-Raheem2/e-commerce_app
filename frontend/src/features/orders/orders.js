import styles from './orders.module.css';
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders} from "./orderSlice";

import Order from './order';    


export default function Orders(){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchOrders());
    },[])

    const orders = useSelector((state)=>state.orders.orders);
    
    return (
        <div className={styles.ordersDiv}>
            <h2>Orders</h2>
            {orders.map((order)=>{
                return <Order order={order} key={order.id}/>
            })}
        </div>
    )
}