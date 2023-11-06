import './index.css';
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LoggedIn from "./LoggedIn";
import NotLoggedIn from "./NotLoggedIn";

export default function Root(){
    const [loggedIn,setLoggedIn] = useState(false);
    return(
        <>
            <header>
                <h1>Shop</h1>
                {loggedIn ? <LoggedIn setLoggedIn={setLoggedIn}/>:<NotLoggedIn/>}
            </header>
            <Outlet context={{setLoggedIn:setLoggedIn}}/>
        </>
    );
}

