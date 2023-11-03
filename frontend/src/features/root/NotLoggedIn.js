import { Link } from "react-router-dom"

export default function NotLoggedIn(){
    return(
        <nav>
            <Link>Register</Link>
            <Link>Log In</Link>
        </nav>
    )
}