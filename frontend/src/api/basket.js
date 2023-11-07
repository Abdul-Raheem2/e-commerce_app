
export const apiFetchBasket = async () => {
    return await fetch(`${process.env.REACT_APP_BASE_URL}/basket`,{
        credentials:'include'
    });
}

export const apiAddProductToBasket = async (productId) => {
    return await fetch(`${process.env.REACT_APP_BASE_URL}/basket`,{
        method:'POST',
        credentials:'include',
        body: JSON.stringify({
            productId,
            quantity:1
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
}