
export const apiFetchOrders = async () => {
    return await fetch(`${process.env.REACT_APP_BASE_URL}/orders`,{
        credentials:'include'
    });
}

export const apiFetchOrderDetails = async (orderId) => {
    return await fetch(`${process.env.REACT_APP_BASE_URL}/orders/${orderId}`,{
        credentials:'include'
    });
}