import styles from './root.module.css';
import { Link } from "react-router-dom";
import { apiLogOut } from "../../api/auth";
import { useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLoggedIn } from "../account/accountSlice";
import { fetchBasket } from "../basket/basketSlice";

export default function LoggedIn(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleLogOut(e){
        e.preventDefault();
        const response  = await apiLogOut();
        if(response.ok){
            dispatch(checkLoggedIn());
            dispatch(fetchBasket());
            navigate('/products');
        }else{
            alert("error Logging out");
        }
    }
    return(
        <div className={styles.dropdownContent}>
            <Link className={styles.dropdownLink} to='/account'>account</Link>
            <Link className={styles.dropdownLink} to='/orders'>orders</Link>
            <Link className={styles.dropdownLink} onClick={handleLogOut}>Log Out</Link>
        </div>
    )
}