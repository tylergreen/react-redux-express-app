const login = (state, action) => {
    switch(action.type) {
    case 'LOGIN':
        return Object.assign({}, state, {
            isLoggedIn: true,
            user: action.user,
            jwt: action.jwt
        })
    case 'LOGOUT':
        return Object.assign({}, state, {
            isLoggedIn: false
        })
    case 'UPDATE_USER':
        console.log('updating user.  action.user is')
        console.log(action.user)
        return Object.assign({}, state, {
            user: action.user
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
