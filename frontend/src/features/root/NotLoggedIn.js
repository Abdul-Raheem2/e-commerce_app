import { NavLink} from "react-router-dom"

export default function NotLoggedIn(){
    return(
        <div className="dropdown-content">
            <NavLink className="dropdown-link" to='/register'>Register</NavLink>
            <NavLink className="dropdown-link" to='/logIn'>Log In</NavLink>
        </div>

    )
}