import styles from './listProducts.module.css';
import { useNavigate } from "react-router-dom";
import moneyFormatter from '../utils/money';

export default function ListProduct({product}){
    const navigate = useNavigate();
    function handleClick(e){
        //go to single product page
        navigate(`/products/${product.id}`)
    }
    return (
        <div className={styles.product} onClick={handleClick}>
            <div className={styles.productImg} style={{"backgroundColor":product.image}}></div>
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productPrice}>{moneyFormatter(product.price)}</p>
        </div>
    )
}