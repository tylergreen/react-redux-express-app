import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'

import './components/globalStyles.less'
import reactCSS from 'reactcss'
import CSSModules from 'react-css-modules'

import Timer from './components/timer/timer.jsx'
import LoginForm from './components/loginForm.jsx'
import Registration from './components/registration.jsx'

import AuthenticatedDashboard from './components/authenticatedDashboard.jsx'
import TopBar from './components/topBar.jsx'
import UserProfileForm from './components/userProfileForm.jsx'

import login from './reducers/login'
import timerReducer from './reducers/timerReducer'

import timerMiddleware from './middleware/timerMiddleware'
import userMiddleware from './middleware/userMiddleware'

import { Router,
         Route,
         Link,
         IndexRoute,
         browserHistory } from 'react-router'

let _ = require('lodash')

console.log(login)

const reducers =  {
    login: login,
    timer: timerReducer
}

const reducer = combineReducers(reducers)

// only for temp debugging -- figure out how to toggle for dev/prod
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(reducer,
                        composeEnhancers(
                        applyMiddleware(timerMiddleware,
                                        userMiddleware,
                                        thunk)))

class Home extends React.Component {
    render(){
        if(this.props.userAuthenticated){
            return <AuthenticatedDashboard user={this.props.user}/>
        } else {
            return <UnAuthenticatedDashboard />
        }
    }
}



class UnAuthenticatedDashboard extends React.Component {
    render() {
        const styles = reactCSS({
            'default': {
                container: {
                    display: 'flex',
                    alignItems: 'center',
                    alignContent: 'center'
                },
                h1: {
                    color: '#FFF',
                    fontSize: '3em'
                },
                links: {
                    display: 'flex',
                    justifyContent: 'space-around',
                    margin: '1em'
                },
                timer: {
                    display: 'flex',
                    flexFlow: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '3em',
                    width: '100%'
                },
                title: {
                    fontSize: '2em',
                    marginBottom: '1em'
                }
            }
        })

        return (
            <div>
                <TopBar/>
                <div style={styles.container}>
                    <div style={styles.timer}>
                        <h1 style={styles.title}>
                            Timer
                        </h1> 
                        <Timer/>
                    </div>
                </div>
            </div>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        userAuthenticated: state.login.isLoggedIn,
        user: state.login.user,
        chartData: state.timer.chartData
    }
}

// connect will return a new component
// can get rid of this if we just embed in toggle login
var ActiveHome = connect(
    mapStateToProps
)(Home)


function requireAuth(nextState, replace) {
    if (!isAuthenticated()) {
        replace({
            pathname: '/', // redirect to some kind of message
            state: { nextPathname: nextState.location.pathname }
                
        })
    }
}

ReactDOM.render(
    <Provider store={store} >
        <Router history={browserHistory}>
            <Route path="/" component={ActiveHome} />
            <Route path="login" component={LoginForm} />
            <Route path="signUp" component={Registration} />
            
            <Route path="profile" component={UserProfileForm} />
            <Route path="timer" component={Timer} />
        </Router>
    </Provider>,
    document.getElementById('content')
)

