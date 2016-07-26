// change email to expire the JWT 
export const logoutAction = (email) => {
    return {
        type: "LOGOUT",
        email: email
    }
}

export function getMessage(jwt) {
    return (dispatch) => {
        
        //don't need to update the state 
        fetch('/edit-profile', {
            method: 'POST',
            headers: {
                "Authorization" :  'Bearer ' + jwt,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: "Tyler",
                foo: "bar"
            })
        }).then(resp => resp.text()
               ).then(message => {
                   console.log("response is:")
                   console.log(message)
               }).catch(err => {
                   console.log(err);
               })
                   }
}

export function registerAction(email, password){
    return (dispatch) => {
        return fetch('/signup', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(response => {
            if (response.status >= 200 && response.status < 300){
                return response.text()
            }
            else {
                let error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(json => {
            console.log("updated user json")
            let parsed_json = JSON.parse(json)
            return dispatch(receivedAuthorization(parsed_json)) //transition to logged in state
        }).catch(err => {
            console.log(err);
            // flash invalid login credential
        })
            }
}


export function saveProfileAction(user, jwt){
    return (dispatch) => {
        console.log("user is")
        console.log(user)
        return fetch('/edit-profile', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization" :  'Bearer ' + jwt,
            },
        body: JSON.stringify({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        })
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.text()
            } else {
                let error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(json => {
            console.log("updated user json")
            let parsed_json = JSON.parse(json)
            let user = parsed_json.user
            console.log(user)
            return dispatch(updateUser(user))
        }).catch(err => {
            console.log(err);
                    // return the same state 
            // flash invalid login credential
        })
            }
}

export function loginAction(email, password) {
    return (dispatch) => {

        //  dispatch(loginAction(email, password)) // not sure if we need email and password for this
        console.log("email")
        console.log(email)
        console.log("password")
        console.log(password)

        return fetch('/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                 username: email,
                 password: password

            })
        }).then(response => {
            console.log('got response');
            if (response.status >= 200 && response.status < 300) {
                return response.text()  
            } else {
                let error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(json => {  // {user: user, token: Base64String }
            console.log(json); // evidently we have to extract the response like this to force/eval the promise/thin
            var parsed_json = JSON.parse(json)
            return dispatch(receivedAuthorization(parsed_json)) //transition to logged in state
        }).catch(err => {
            console.log(err);
            // flash invalid login credential
        });
    }
}

// move this to lib or helpers
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
          
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}


function receivedAuthorization(json) {
    return {
        type: "LOGIN",
        user: json.user,
        jwt: json.token
    }
}

function updateUser(user) {
    return {
        type: "UPDATE_USER",
        user: user
    }
}

