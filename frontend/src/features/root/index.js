import './index.css';
import { useState } from "react";
import { Outlet ,useNavigate} from "react-router-dom";
import LoggedIn from "./LoggedIn";
import NotLoggedIn from "./NotLoggedIn";

export default function Root(){
    const navigate = useNavigate();
    const [loggedIn,setLoggedIn] = useState(false);
    return(
        <>
            <header>
                <h1 onClick={(e)=>{navigate('/')}}>Colour Shop</h1>
                {loggedIn ? <LoggedIn setLoggedIn={setLoggedIn}/>:<NotLoggedIn/>}
            </header>
            <Outlet context={{setLoggedIn:setLoggedIn}}/>
        </>
    );
}

