// export const loginAction = (email, password) => {
//     return {
//         type: "LOGIN",
//         email: email,
//         password: password
//     }
    
// }

export const logoutAction = (email) => {
    return {
        type: "LOGOUT",
        email: email
    }
}

export function loginAction(email, password) {
    return (dispatch) => {

        //  dispatch(loginAction(email, password)) // not sure if we need email and password for this
        console.log("email")
        console.log(email)
        console.log("password")
        console.log(password)

        fetch('/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                 username: email,
                 password: password
//                username: "user",
//                password: "user"

            })
        }).then(response => {
            console.log('got response');
            return response.text()
        }).then(text => {
            console.log(text); // evidently we have to extract the response like this
        }).catch(err => {
            console.log(err);
        });
        
        return {
            type: "LOGIN",
            email: email,
            password: password
        };
    }
}
