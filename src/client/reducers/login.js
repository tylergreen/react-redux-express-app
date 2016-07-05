const login = (state, action) => {
    switch(action.type) {
    case 'LOGIN':
        return Object.assign({}, state, {
            isLoggedIn: true
        })
    case 'LOGOUT':
        return Object.assign({}, state, {
            isLoggedIn: false
        })
    default:
        return state
    }
}

export default login

        // if(action.email == "Tyler"){
        //     return Object.assign({}, state, {
        //         isLoggedIn: true
        //     })
        // } else
        //     return state
