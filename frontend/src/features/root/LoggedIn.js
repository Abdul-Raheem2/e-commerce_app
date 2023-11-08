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
            //alert("error");
        }
    }
    return(
        <div className="dropdown-content">
            <Link className="dropdown-link" to='/account'>account</Link>
            <Link className="dropdown-link" to='/orders'>orders</Link>
            <Link className="dropdown-link" onClick={handleLogOut}>Log Out</Link>
        </div>
    )
}