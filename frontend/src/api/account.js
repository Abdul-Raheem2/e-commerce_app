
export const apiFetchAccountDetails = async () => {
    return await fetch(`${process.env.REACT_APP_BASE_URL}/account`,{
        credentials:'include'
    });
}