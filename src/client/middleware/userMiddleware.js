export default function userMiddleware(store){
    return next => action => {
        //        if (action.type === 'RECEIVED_JWT_AUTH') {
        if (action.type === 'LOGIN') {
            console.log("starting timer")
            setTimeout(() => {
                console.log("attempting to log out")
                store.dispatch({type: "LOGOUT",
                                email: null
                               })
            }, action.jwtDuration)
        }
        next(action)
    }
}
