import moment from 'moment'

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
        return Object.assign({}, state, {
            user: action.user
        })
    case 'START_TIMER':
        return Object.assign({}, state, {
            timer: {
                state: 'Running',
                startTime: moment()
            }
        })
    case 'STOP_TIMER':
        return Object.assign({}, state, {
            timer: {
                state: 'Stopped'
            }
        })
    case 'RESET_TIMER':
        return Object.assign({}, state, {
            timer: {
                state: 'Ready'
            }
        })
    case 'RESUME_TIMER':
        return Object.assign({}, state, {
            timer: {
                state: 'Running'
            }
        })
    default:
        return state
    }
}

export default login
