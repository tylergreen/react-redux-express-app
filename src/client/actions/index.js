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

        //      return fetch(`localhost:3000/api/restricted)  // configure this

        fetch('http://localhost:3000/hello', {
            method: 'get',
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
