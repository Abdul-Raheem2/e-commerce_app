import { useEffect } from "react";
import { NavLink,useNavigate } from "react-router-dom"

export default function NotLoggedIn(){
    const navigate = useNavigate();
    useEffect(()=>{
        navigate('/');
    },[navigate]);
    return(
        <div className="dropdown-content">
            <NavLink className="dropdown-link" to='/register'>Register</NavLink>
            <NavLink className="dropdown-link" to='/logIn'>Log In</NavLink>
        </div>

    )
}