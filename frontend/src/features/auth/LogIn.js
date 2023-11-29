import styles from './auth.module.css';
import { useState } from "react";
import { useNavigate,Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import GoogleButton from 'react-google-button';

import { apiLogIn } from "../../api/auth";
import { checkLoggedIn} from "../account/accountSlice";
import { fetchBasket } from "../basket/basketSlice";



export default function LogIn(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [email,setEmail] = useState('');
    const [password,setPassword]= useState('');
    
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
/*         <div>
            <h2>Log In</h2>
            <form className={styles.auth} onSubmit={handleSubmit}>
                <div id="login-email-div">
                    <label htmlFor="login-email-input">Email</label>
                    <input type="email" id="login-email-input" name="email" placeholder="Enter email" required value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div id="login-password-div">
                    <label htmlFor="login-password-input">Password</label>
                    <input type="password" id="login-password-input" name="password" placeholder="Enter password" required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>

                <input type="submit" value="Log In"/>
                <GoogleButton 
                    onClick={(e) => {
                        e.preventDefault()
                        window.location.href = `http://localhost:3000/login/google`
                    }}
                />
            </form>
        </div> */
        <div className={styles.authDiv}>
            <h2>Login</h2>
            <form className={styles.authForm} onSubmit={handleSubmit}>
                <input className={styles.dataInput} type="email" name="email" placeholder="Email" required value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <input className={styles.dataInput} type="password" name="password" placeholder="Password" required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <input className={styles.submitBtn} type="submit" value="Log In"/>
            </form>
            <p className={styles.registerLink}>No Account? <Link to='/register'>Register</Link></p>
            <div className={styles.oauthLoginDiv}>
                <p>or</p>
                <GoogleButton
                    className={styles.googleLoginBtn}
                    onClick={(e) => {
                        e.preventDefault()
                        window.location.href = `http://localhost:3000/login/google`
                    }}
                />
            </div>
        </div>
    )
}