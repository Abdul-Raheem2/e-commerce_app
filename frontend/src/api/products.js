
export const apiFetchProducts = async () => {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/products`,{
        credentials:'include'
    });
}

export const apiFetchProductsByCategory = async (category) => {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/products?`+ new URLSearchParams({category}),{
        credentials:'include'
    });
}

export const apiFetchProduct = async (productId) => {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`,{
        credentials:'include'
    });
}

export const apiFetchCategories = async (productId) => {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/categories`,{
        credentials:'include'
    });
}



