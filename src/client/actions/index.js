// move this to a timerAction file
export const updateLabel = (label) => {
    return {
        type: "UPDATE_LABEL",
        label: label,
    }
}

export function searchTimings(label, jwt) {
    return (dispatch) => {
        return fetch('/timings', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization" :  'Bearer ' + jwt,
            },
            body: JSON.stringify({
                label: label
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
            console.log("got timing data from server")
            console.log(json)
            let parsed_json = JSON.parse(json)
            return dispatch(receivedChartData(parsed_json)) //transition to logged in state
        }).catch(err => {
            console.log(err);
            // flash invalid login credential
        })
            } 
}

export const updateSearchLabel = (label) => {
    return {
        type: "UPDATE_SEARCH_LABEL",
        label: label,

    }
}

// change email to expire the JWT 
export const logoutAction = (email) => {
    return {
        type: "LOGOUT",
        email: email
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

function receivedChartData(json){
    return {
        type: "RECEIVED_CHART_DATA",
        chartData: json
    }
}

function updateUser(user) {
    return {
        type: "UPDATE_USER",
        user: user
    }
}

// Timer Actions


export function resetTimer(){
    return {
        type: "RESET_TIMER"
    }
}

export function resumeTimer(){
    return {
        type: "RESUME_TIMER"
    }
}

export function startTimer(){
    return {
        type: "START_TIMER"
    }
}

export function stopTimer(interval){
    return {
        type: "STOP_TIMER",
        interval
    }
}

export function lapTimerAction(timestamp){
    return {
        type: 'LAP_TIMER',
        lapTime: timestamp
    }
}

export function getTimings(timer, jwt){
    return (dispatch) => {
        return fetch('/timings', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization" :  'Bearer ' + jwt,
            },
            body: JSON.stringify({
                label: timer.label,
                // can add date range later and other filters/search options
                
            })
        }).then(resp => {
                console.log("Got Timings")
                console.log(resp)
                // render sweet bar chart graph
            })
    }
}

export function recordTimer(timer, jwt){
    return (dispatch) => {
        return fetch('/recordTimer', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization" :  'Bearer ' + jwt,
            },
            body: JSON.stringify({
                label: timer.label,
                startTime: timer.startTime,
                duration: timer.total_elapsed
            })
        }).then(resp => {
            console.log('got response')
            console.log(resp)
        })
    }
}



