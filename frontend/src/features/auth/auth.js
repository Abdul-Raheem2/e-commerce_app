
export async function authLogIn(email,password){
    return await fetch('http://localhost:3000/login',{
        method:'POST',
        body: JSON.stringify({
            email,
            password
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function authRegister(email,password,firstName,lastName){
    return await fetch('http://localhost:3000/register',{
        method:'POST',
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

export async function authLogOut(){
    return await fetch('http://localhost:3000/logout',{
        method:'POST'
    });
}