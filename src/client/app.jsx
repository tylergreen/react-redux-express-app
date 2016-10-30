import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'

import fetch from 'fetch-ponyfill'
import reactCSS from 'reactcss'
import CSSModules from 'react-css-modules'

import {MySlider} from './components/mySlider.jsx'
import OrigSlider from './components/origSlider.jsx'
import TimeChart from './components/timeChart.jsx'
import Timer from './components/timer.jsx'
import LoginBar from './components/loginBar.jsx'
import LoginForm from './components/loginForm.jsx'
import Registration from './components/registration.jsx'

import AuthenticationBar from './components/authenticationBar.jsx'
import TopBar from './components/topBar.jsx'

import login from './reducers/login'
import timerReducer from './reducers/timerReducer'

import timerMiddleware from './middleware/timerMiddleware'
import userMiddleware from './middleware/userMiddleware'

import {
    loginAction, logoutAction, getMessage,
    saveProfileAction, 
    startTimer,
    stopTimer,
    resumeTimer,
    resetTimer,
    recordTimer,
    updateLabel ,
    lapTimerAction,
    getTimings
} from './actions/index'

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

let store = createStore(reducer,
                        applyMiddleware(timerMiddleware,
                                        userMiddleware,
                                        thunk));

// this needs to be redone
class LogoutButton extends React.Component {

    render() {
        return <button onClick={this.logOut}> Logout </button>
    }

    logOut() {
        console.log("Logging Out Bye Tyler!")
        console.log("Store state:")
        console.log(store.getState())
        store.dispatch(logoutAction("monkey@gmail")) // change this to expire the JWT
        console.log("updated state:")
        console.log(store.getState())
    }
}

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
                    justifyContent: 'space-around',
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
                    justifyContent: 'center',
                    margin: '3em',
                    width: '100%'
                },
                loginBar: {
                    display: 'flex',
                    alignItems: 'left',
                    width: '100%',
                }
            }
        })

        return (
            <div>
                <TopBar/>
                <div style={styles.container}>
                    <div style={styles.timer}>
                        <Timer
                            handleSubmit={recordTimer} />
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
            
            <Route path="slider" component={OrigSlider} />
            <Route path="timer" component={Timer} />
        </Router>
    </Provider>,
    document.getElementById('content')
)

