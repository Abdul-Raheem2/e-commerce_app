
export const apiFetchProducts = async () => {
    return await fetch(`${process.env.REACT_APP_BASE_URL}/products`,{
        credentials:'include'
    });
}



