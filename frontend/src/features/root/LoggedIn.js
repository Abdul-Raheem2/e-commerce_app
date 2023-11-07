import { Link } from "react-router-dom";
import { apiLogOut } from "../../api/auth";
import { useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { accountLogOut } from "../account/accountSlice";
import { basketLogOut } from "../basket/basketSlice";

export default function LoggedIn(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleLogOut(e){
        e.preventDefault();
        const response  = await apiLogOut();
        if(response.ok){
            dispatch(accountLogOut());
            dispatch(basketLogOut());
            navigate('/');
        }else{
            alert("error");
        }
    }
    return(
        <nav>
            <Link to='/basket'>basket</Link>
            <Link to='/account'>account</Link>
            <Link to='/orders'>orders</Link>
            <Link onClick={handleLogOut}>Log Out</Link>
        </nav>
    )
}