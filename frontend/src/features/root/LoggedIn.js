import { Link } from "react-router-dom";

export default function LoggedIn(){
    return(
        <nav>
            <Link>basket</Link>
            <Link>account</Link>
            <Link>orders</Link>
        </nav>
    )
}