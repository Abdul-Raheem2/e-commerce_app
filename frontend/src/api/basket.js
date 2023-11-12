
export const apiFetchBasket = async () => {
    return await fetch(`${process.env.REACT_APP_BASE_URL}/basket`,{
        credentials:'include'
    });
}

export const apiAddProductToBasket = async (productId,quantity) => {
    return await fetch(`${process.env.REACT_APP_BASE_URL}/basket`,{
        method:'POST',
        credentials:'include',
        body: JSON.stringify({
            productId,
            quantity
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const apiUpdateQuantity = async (productId,quantity) =>{
    return await fetch(`${process.env.REACT_APP_BASE_URL}/basket`,{
        method:'PUT',
        credentials:'include',
        body: JSON.stringify({
            productId,
            quantity
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const apiRemoveFromBasket = async (productId) =>{
    return await fetch(`${process.env.REACT_APP_BASE_URL}/basket/${productId}`,{
        method:'DELETE',
        credentials:'include'
    });
}