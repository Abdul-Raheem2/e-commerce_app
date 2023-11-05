
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom"

export default function LogIn(){
    const navigate = useNavigate();
    const {setLoggedIn} = useOutletContext();
    const [email,setEmail] = useState();
    const [password,setPassword]= useState();
    function handleSubmit(e){
        e.preventDefault();
        setLoggedIn(true);
        navigate('/');
    }
    return(
        <div>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label for="email">Email</label>
                    <input type="text" id="email" name="email" required value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>

                <input type="submit" value="Log In"/>
            </form>
        </div>
    )
}