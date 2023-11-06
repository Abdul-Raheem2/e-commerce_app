
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
import { authRegister } from "./auth";

export default function Register(){
    const navigate = useNavigate();
    const confirmPasswordRef = useRef(null);

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        const response = await authRegister(email,password,firstName,lastName);
        console.log(response);
        if(response.ok){
            navigate('/login');
        }else{
            alert("error");
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
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div id="register-email-div">
                    <label htmlFor="register-email-input">Email</label>
                    <input type="email" id="register-email-input" name="email" placeholder="Enter Email" required value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div id="register-password-div">
                    <label htmlFor="register-password-input">Password</label>
                    <input type="password" id="register-password-input" name="password" placeholder="Enter Password" required value={password} minLength="8" onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <div id="register-confirmpassword-div">
                    <label htmlFor="register-confirmpassword-input">Confirm Password</label>
                    <input type="password" id="register-confirmpassword-input" ref={confirmPasswordRef} placeholder="Re-enter Password" required value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                </div>
                <div id="register-firstname-div">
                    <label htmlFor="register-firstname-input">First Name</label>
                    <input type="text" id="register-firstname-input" name="firstName" placeholder="Enter First Name" required value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                </div>
                <div id="register-lastname-div">
                    <label htmlFor="register-lastname-input">Last Name</label>
                    <input type="text" id="register-lastname-input" name="lastName" placeholder="Enter Last Name" required value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                </div>
                <input type="submit" value="Register"/>
            </form>
        </div>

    )
}