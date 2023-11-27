import './root.css';
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
            <header>
                <h1 onClick={(e)=>{navigate('/products')}}>Colour Shop</h1>
                <nav>
                    <div className="icon-div">
                        <Link to='/products'><FaShoppingBag className="icon"/></Link>
                        <span>Products</span>
                    </div>
                    <div className="icon-div">
                        <Link to='/basket'><FaShoppingBasket className="icon"/></Link>
                        <span>Basket</span>
                    </div>

                    <div className="dropdown">
                        <FaUserCircle className="icon dropbtn"/>
                        {account.loggedIn ? <LoggedIn/>:<NotLoggedIn/>}
                    </div>
                </nav>
            </header>
            <Outlet/>
            <ToastContainer/>
        </>
    );
}

