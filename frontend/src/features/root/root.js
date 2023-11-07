import { useEffect} from "react";
import { useDispatch } from "react-redux";
import { Outlet ,useNavigate} from "react-router-dom";
import LoggedIn from "./LoggedIn";
import NotLoggedIn from "./NotLoggedIn";
import { useSelector } from "react-redux";
import { fetchAccountDetails } from "../account/accountSlice";

export default function Root(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const account = useSelector((state)=>state.account);
    useEffect(()=>{
        dispatch(fetchAccountDetails());
    },[dispatch]);
    return(
        <>
            <header>
                <h1 onClick={(e)=>{navigate('/')}}>Colour Shop</h1>
                {account.loggedIn ? <LoggedIn/>:<NotLoggedIn/>}
            </header>
            <Outlet/>
        </>
    );
}

