import { useNavigate } from "react-router-dom"

export default function Register(){
    const navigate = useNavigate();
    function handleClick(e){
        navigate('/login');
    }
    return(
        <div>
            <button onClick={handleClick}>Register</button>
        </div>

    )
}