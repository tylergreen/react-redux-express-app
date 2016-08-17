let initialState = { isLoggedIn: false,                   }

const login = (state=initialState, action) => {
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
        return Object.assign({}, state, {
            user: action.user
        })
    default:
        return state
    }
}

export default login
