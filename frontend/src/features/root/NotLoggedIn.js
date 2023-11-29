import styles from './root.module.css';
import { NavLink} from "react-router-dom"

export default function NotLoggedIn(){
    return(
        <div className={styles.dropdownContent}>
            <NavLink className={styles.dropdownLink} to='/register'>Register</NavLink>
            <NavLink className={styles.dropdownLink} to='/logIn'>Login</NavLink>
        </div>

    )
}