import styles from './auth.module.css';
import { useEffect, useState } from "react";
import { useNavigate,Link} from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import GoogleButton from 'react-google-button';

import { apiLogIn } from "../../api/auth";
import { checkLoggedIn} from "../account/accountSlice";
import { fetchBasket } from "../basket/basketSlice";



export default function LogIn(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [email,setEmail] = useState('');
    const [password,setPassword]= useState('');

    const account = useSelector((state)=>state.account);

    useEffect(()=>{
        if(account.loggedIn){
            navigate('/account');
        }
    },[account,navigate])
    
    async function handleSubmit(e){
        e.preventDefault();
        const response = await apiLogIn(email,password);
        if(response.ok){
            dispatch(checkLoggedIn());
            dispatch(fetchBasket());
            navigate(-1);
        }else{
            alert('Incorrect username or password');
        }
    }
    return(
        <div className={styles.authDiv}>
            <h2>Login</h2>
            <form className={styles.authForm} onSubmit={handleSubmit}>
                <input className={styles.dataInput} type="email" name="email" placeholder="Email" required value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <input className={styles.dataInput} type="password" name="password" placeholder="Password" required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <input className={styles.submitBtn} type="submit" value="Log In"/>
            </form>
            <p className={styles.authLink}>No Account? <Link to='/register'>Register</Link></p>
            <div className={styles.oauthLoginDiv}>
                <p>or</p>
                <GoogleButton
                    className={styles.googleLoginBtn}
                    onClick={(e) => {
                        e.preventDefault()
                        window.location.href = `${process.env.REACT_APP_API_BASE_URL}/login/google`
                    }}
                />
            </div>
        </div>
    )
}