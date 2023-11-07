

export async function apiLogIn(email,password){
    return await fetch(`${process.env.REACT_APP_BASE_URL}/login`,{
        method:'POST',
        credentials:'include',
        body: JSON.stringify({
            email,
            password
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function apiRegister(email,password,firstName,lastName){
    return await fetch(`${process.env.REACT_APP_BASE_URL}/register`,{
        method:'POST',
        credentials:'include',
        body: JSON.stringify({
            email,
            password,
            firstName,
            lastName
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
}

export async function apiLogOut(){
    return await fetch(`${process.env.REACT_APP_BASE_URL}/logout`,{
        method:'POST',
        credentials:'include'
    });
}