import { NavLink } from "react-router-dom"

export default function NotLoggedIn(){
    return(
        <nav>
            <NavLink to='/register'>Register</NavLink>
            <NavLink to='/logIn'>Log In</NavLink>
        </nav>
    )
}