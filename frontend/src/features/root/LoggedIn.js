import { Link } from "react-router-dom";
import { authLogOut } from "../auth/auth";
import { useNavigate} from "react-router-dom";

export default function LoggedIn({setLoggedIn}){
    const navigate = useNavigate();

    async function handleLogOut(e){
        e.preventDefault();
        const response  = await authLogOut();
        if(response.ok){
            setLoggedIn(false);
            navigate('/');
        }else{
            alert("error");
        }
    }
    return(
        <nav>
            <Link>basket</Link>
            <Link>account</Link>
            <Link>orders</Link>
            <Link onClick={handleLogOut}>Log Out</Link>
        </nav>
    )
}