import styles from './auth.module.css';

import { useEffect, useRef, useState } from "react";
import { useNavigate,Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiRegister,apiLogIn } from "../../api/auth";
import { checkLoggedIn } from "../account/accountSlice";
import { fetchBasket } from "../basket/basketSlice";
import GoogleButton from 'react-google-button';

export default function Register(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const confirmPasswordRef = useRef(null);

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        const registerResponse = await apiRegister(email,password,firstName,lastName);
        if(registerResponse.ok){
            const logInResponse = await apiLogIn(email,password);
            if(logInResponse.ok){
                dispatch(checkLoggedIn());
                dispatch(fetchBasket());
                navigate('/products');
            }else{
                alert('error auto login');
            }
        }else if(registerResponse.status === 409){
            const data = await registerResponse.json();
            if(data.google){
                alert("email is already registered using Google login. Please Log in using Google and add a password from the account page to log in locally");
            }else{
                alert("email is already registered. Please Log in");
            }
            navigate('/login');
        }else{
            alert("enter username/password");
        }
    }

    useEffect(()=>{
        if (password!==confirmPassword) {
            confirmPasswordRef.current.setCustomValidity("passwords do not match");
          } else {
            confirmPasswordRef.current.setCustomValidity("");
          }
    },[password,confirmPassword]);
    return(
        <div className={styles.authDiv}>
            <h2>Register</h2>
            <form className={styles.authForm} onSubmit={handleSubmit}>
                <input className={styles.dataInput} type="email" name="email" placeholder="Enter Email" required value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <input className={styles.dataInput} type="password" name="password" placeholder="Enter Password" required value={password} minLength="8" onChange={(e)=>{setPassword(e.target.value)}}/>
                <input className={styles.dataInput} type="password" ref={confirmPasswordRef} placeholder="Confirm Password" required value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                <div className={styles.smallDataDiv}>
                    <input className={styles.smallDataInput} type="text" name="firstName" placeholder="Enter First Name" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                    <input className={styles.smallDataInput} type="text" name="lastName" placeholder="Enter Last Name" value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                </div>  
                <input className={styles.submitBtn} type="submit" value="Register"/>
            </form>
            <p className={styles.authLink}>Already have an account? <Link to='/Login'>Login</Link></p>
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