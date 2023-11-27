
export const apiCreateCheckoutSession = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/checkout/create-checkout-session`,{
        method:'POST',
        credentials:'include'
    });
    return await response.json();
}

export const apiFetchCheckoutSessionStatus = async (session_id) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/checkout/session-status?`+ new URLSearchParams({session_id}),{
        credentials:'include'
    });
    return await response.json();
}