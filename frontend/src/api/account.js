
export const apiFetchAccountDetails = async () => {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/account`,{
        credentials:'include'
    });
}