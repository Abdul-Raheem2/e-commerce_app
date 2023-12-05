
export const apiCreateCheckoutSession = async () => {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/checkout/create-checkout-session`,{
        method:'POST',
        credentials:'include'
    });
}

export const apiFetchCheckoutSessionStatus = async (session_id) => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/checkout/session-status?`+ new URLSearchParams({session_id}),{
        credentials:'include'
    });
    return await response.json();
}