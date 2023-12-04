import styles from './orders.module.css';

import { useDispatch} from "react-redux";

import { fetchOrdersDetails,UnselectOrder } from './orderSlice';
import moneyFormatter from "../../utils/money";
import { FaAngleRight,FaAngleLeft } from "react-icons/fa";

export default function Order({order,selected}){
    const dispatch = useDispatch();

    const orderDate = new Date(order.order_date).toLocaleString('default', {
        day:'numeric',
        month: 'short',
        year: 'numeric',
        hour:'2-digit',
        minute:'2-digit'
    });

    function handleSelectClick(e){
        dispatch(fetchOrdersDetails({orderId:order.id}));
    }
    function handleUnselectClick(e){
        dispatch(UnselectOrder());
    }
    return (
        <tr className={selected? styles.highlightedOrder:null}>
            <td>{order.id}</td>
            <td>{orderDate}</td>
            <td>{order.num_products}</td>
            <td>{moneyFormatter(order.total_cost)}</td>
            <td>{order.status}</td>
            <td>
                {selected? <button onClick={handleUnselectClick}><FaAngleLeft/></button>
                :<button onClick={handleSelectClick}><FaAngleRight/></button>}
            </td>
        </tr>

    )
}