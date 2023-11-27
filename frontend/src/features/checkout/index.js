import {loadStripe} from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { apiCreateCheckoutSession } from '../../api/checkout';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe('pk_test_51O3htwA0mQPZIaArFvbsgi3eaZyFMRcNOyP3rbDFvMpBTkOyK9aAu2HdP3dEmJSvBL12fNCZOqPAJ1GFtS95MajN001QQsylCy');

export default function Checkout(){
    const [clientSecret, setClientSecret] = useState('');
    
    useEffect(() => {
        apiCreateCheckoutSession()
            .then((data) => setClientSecret(data.clientSecret));
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