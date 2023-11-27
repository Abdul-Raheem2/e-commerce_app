import { useState } from 'react';
import {useStripe,useElements, PaymentElement} from '@stripe/react-stripe-js';

export default function CheckoutForm(){
    const stripe = useStripe();
    const elements = useElements();
  
    const [errorMessage, setErrorMessage] = useState(null);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const paymentResult = await stripe.confirmPayment({
            elements,
            redirect:'if_required',
            
        });
    
    
        if (paymentResult.error) {
            setErrorMessage(paymentResult.error.message);
        }else{
            if (paymentResult.paymentIntent.status === "succeeded") {
                alert("Success!");
                console.log(paymentResult);
            }
        }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button disabled={!stripe}>Submit</button>
        {errorMessage && <div>{errorMessage}</div>}
      </form>
    )
}