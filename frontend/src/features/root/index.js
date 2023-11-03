import './index.css';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import LoggedIn from "./LoggedIn";
import NotLoggedIn from "./NotLoggedIn";

export default function Root(){
    const [loggedIn,setLoggedIn] = useState(false);
    return(
        <>
            <header>
                <h1>Shop</h1>
                {loggedIn ? <LoggedIn/>:<NotLoggedIn/>}
            </header>
            <Outlet context={{setLoggedIn:setLoggedIn}}/>
        </>
    );
}

