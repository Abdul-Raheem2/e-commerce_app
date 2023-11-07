
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiLogIn } from "../../api/auth";
import { setLoggedIn } from "../account/accountSlice";

export default function LogIn(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [email,setEmail] = useState('');
    const [password,setPassword]= useState('');
    
    async function handleSubmit(e){
        e.preventDefault();
        const response = await apiLogIn(email,password);
        if(response.ok){
            dispatch(setLoggedIn(true));
            navigate('/');
        }else{
            alert('Incorrect username or password');
        }
    }
    return(
        <div>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <div id="login-email-div">
                    <label htmlFor="login-email-input">Email</label>
                    <input type="email" id="login-email-input" name="email" placeholder="Enter email" required value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div id="login-password-div">
                    <label htmlFor="login-password-input">Password</label>
                    <input type="password" id="login-password-input" name="password" placeholder="Enter password" required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>

                <input type="submit" value="Log In"/>
            </form>
        </div>
    )
}