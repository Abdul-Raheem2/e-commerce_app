import { useState,useEffect} from "react";
import { apiFetchCheckoutSessionStatus } from "../../api/checkout";
import { useNavigate } from "react-router-dom";

export default function PaymentReturn(){
    const navigate = useNavigate();
    const [status, setStatus] = useState(null);
  
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');
  
        apiFetchCheckoutSessionStatus(sessionId)
        .then((data) => {
            setStatus(data.status);
        });
    }, []);
  
    if (status === 'open') {
        navigate('/checkout');
    }
    else if (status === 'complete') {
        return <p>Thank You. Your order has been recieved and is now being processed.</p>
    }
    return null;
}