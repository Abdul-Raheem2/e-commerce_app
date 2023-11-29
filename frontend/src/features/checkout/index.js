import {loadStripe} from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { apiCreateCheckoutSession } from '../../api/checkout';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51O3htwA0mQPZIaArFvbsgi3eaZyFMRcNOyP3rbDFvMpBTkOyK9aAu2HdP3dEmJSvBL12fNCZOqPAJ1GFtS95MajN001QQsylCy');

export default function Checkout(){
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState('');
    
    useEffect(() => {
        async function getCheckoutSession(){
            const response = await apiCreateCheckoutSession()
            if(response.ok){
                const data = await response.json()
                setClientSecret(data.clientSecret);
            }else{
                switch(response.status){
                    case (401):
                        navigate('/login');
                        break;
                    case (400):
                        navigate('/basket');
                        alert('no products in basket');
                        break;
                    default:
                        navigate('/');
                }
            }
        }
        getCheckoutSession();
    }, []);
    
    const options = {clientSecret};
    
    return (
        <div id="checkout">
            {clientSecret && (
                <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            )}
        </div>
    )

}