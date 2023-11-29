import styles from './root.module.css';
import { useEffect} from "react";
import { useDispatch } from "react-redux";
import { Link,Outlet ,useNavigate} from "react-router-dom";
import LoggedIn from "./LoggedIn";
import NotLoggedIn from "./NotLoggedIn";
import { useSelector } from "react-redux";
import { checkLoggedIn } from "../account/accountSlice";

import { FaShoppingBasket,FaUserCircle,FaShoppingBag } from "react-icons/fa";

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Root(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const account = useSelector((state)=>state.account);
    useEffect(()=>{
        dispatch(checkLoggedIn());
        //navigate('/products');
    },[dispatch,navigate]);
    return(
        <>
            <header className={styles.header}>
                <h1 className={styles.heading} onClick={(e)=>{navigate('/')}}>The Colour Shop</h1>
                <nav className={styles.nav}>
                    <div className={styles.iconWithLabel}>
                        <Link to='/products'><FaShoppingBag className={styles.icon}/></Link>
                        <span>Products</span>
                    </div>
                    <div className={styles.iconWithLabel}>
                        <Link to='/basket'><FaShoppingBasket className={styles.icon}/></Link>
                        <span>Basket</span>
                    </div>

                    <div className={styles.dropdown}>
                        <FaUserCircle className={styles.icon}/>
                        {account.loggedIn ? <LoggedIn/>:<NotLoggedIn/>}
                    </div>
                </nav>
            </header>
            <Outlet/>
            <ToastContainer/>
        </>
    );
}

