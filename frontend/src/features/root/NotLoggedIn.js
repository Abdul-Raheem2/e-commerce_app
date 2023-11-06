import { useEffect } from "react";
import { NavLink,useNavigate } from "react-router-dom"

export default function NotLoggedIn(){
    const navigate = useNavigate();
    useEffect(()=>{
        navigate('/');
    },[navigate]);
    return(
        <nav>
            <NavLink to='/register'>Register</NavLink>
            <NavLink to='/logIn'>Log In</NavLink>
        </nav>
    )
}