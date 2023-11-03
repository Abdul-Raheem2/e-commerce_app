import { useNavigate, useOutletContext } from "react-router-dom"

export default function LogIn(){
    const navigate = useNavigate();
    const {setLoggedIn} = useOutletContext();

    function handleClick(e){
        setLoggedIn(true);
        navigate('/');
    }
    return(
        <div>
            <button onClick={handleClick}>Log In</button>
        </div>

    )
}