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

import { Router, Route, Link, browserHistory } from 'react-router'

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
            return <AuthenticatedDashboard />
        } else {
            return <UnAuthenticatedDashboard />
        }
    }
}

class AuthenticatedDashboard extends React.Component {
    render(){
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
                    margin: '3em'
                }
            }
        })

        return <div style={styles.container}>
                        
        <div> Welcome {this.props.user.firstName} ! {this.props.user.email}
        <Link to="/profile">Edit profile</Link>
                </div>
            
                <div style={styles.timer}>
                    <ActiveTimer handleSubmit={recordTimer} />
                </div>

                <div style={styles.timeChart}>
                    <TimeChart
                        chartData={this.props.chartData}
                        store={store}/>
                </div>
        </div>
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
                    alignContent: 'center',
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
                }
            }
        })

        return <div style={styles.container}>
            <div style={styles.timer}>
                    <ActiveTimer
                        handleSubmit={recordTimer} />
                </div>
        </div>
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

var ActiveTopBar = connect(
    (state) => {
        return {
            authenticated: state.login.isLoggedIn,
        }
    }
)(TopBar)


function time_display_string(milliseconds){
    var count = milliseconds
    var seconds = Math.floor(count / 1000.0) % 60
    var minutes = Math.floor(count / 60000.0) % 60
    var hours = Math.floor(count / 3600000.0) % 60
    
    hours = ("0" + hours).slice(-2)
    minutes = ("0" + minutes).slice(-2)
    seconds = ("0" + seconds).slice(-2)
    
    return `${hours}:${minutes}:${seconds}`
}


class Timer extends React.Component {

    startTimeStamp(){
        if(this.props.originalTimeStamp){
            var date = new Date(this.props.originalTimeStamp)
            return `Start Time: ${date.toDateString()} ${date.toTimeString()}`
        }
        else
            return ""
    }
    
    render() {
        const styles = reactCSS({
            'default': {
                timer: {
                    display: 'flex',
                    flexFlow: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50%',
                },
                h1: {
                    margin: '1em'
                },
                timeStamp: {
                    height: '1.5em'
                }
            }
        })

        return <div style={styles.timer}>
                <h1 style={styles.h1}>Timer</h1>
                <TimerLabel/>
                <div style={styles.timeStamp}> { this.startTimeStamp() } </div>
            
            <TimerDisplay elapsed={time_display_string(this.props.elapsed)}/>
            
            <TimerControl timer_state={this.props.timer_state} label ={ this.props.label }/>
            
            <LapDisplay lapTimes={this.props.lapTimes}/>
          </div>
    }
}

class LapDisplay extends React.Component {
    render(){
        if(this.props.lapTimes.length > 0){
            return <div>
              Lap Times 
              <ol>
                  {this.props.lapTimes.map((lap) => {
                       return <li key={lap}> {time_display_string(lap)} </li>
                   })}
              </ol>
            </div>
        }
        else
            return <div></div>
    }
}

class TimerLabel extends React.Component {
    handleChange(event){
        store.dispatch(updateLabel(event.target.value))
    }
    
    render(){
        const styles = reactCSS({
            'default': {
                container: {
                    margin: '1em'
                }
            }
        })
        
        return <div style={styles.container}>
                Timer Label:  <input
                                  type="text" onChange={this.handleChange} />
        </div>
    }
}

class TimerDisplay extends React.Component {
    render() {
        const styles = reactCSS({
            'default': {
                display: {
                    fontSize: '5em',
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '0.5em'
                }}})

        return <div style={styles.display}>
            {this.props.elapsed}
        </div>
    }
}

class TimerControl extends React.Component {
    render(){
        return this.updateButtons()
    }

    updateButtons(){
        const styles = reactCSS({
            'default': {
                container: {
                    display: 'flex',
                    justifyContent: 'center',
                }}})
        
        if(this.isReady()){
            return <div style={styles.container}> <StartButton/></div>
        } else if (this.isRunning()){
            return <div style={styles.container}>
                <StopButton/>
                <LapButton/>
                </div>
        } else if (this.isStopped()) {
            return <div style={styles.container}>
                <ResumeButton/>
                <RecordButton/>
                <ResetButton/>
                </div>
        }
        
        else {
            return <StartButton></StartButton>
        }
    }

    isReady() {
        return this.props.timer_state == 'Ready'
    }

    isRunning (){
        return (this.props.timer_state == 'Running')
    }

    isStopped(){
        return (this.props.timer_state == 'Stopped')
    }
}

const mapTimerStateToProps = (state) => {
    console.log("map stat to props is")
    console.log(state)
    //    return state.timer
    return state.timer
}

// pattern is do do this for a whole list of componenets
// instead of passing down from parent
let ActiveTimer = connect(mapTimerStateToProps)(Timer)

class TimerButton extends React.Component {
    render() {
        const styles = reactCSS({
            'default': {
                button: {
                    background: this.props.color,
                    borderRadius: '2em',
                    border: '0.5em solid',
                    display:'inline-block',
                    cursor:'pointer',
                    color:'#ffffff',
                    fontFamily:'Arial',
                    fontSize:'2em',
                    padding:'1em 1em'
                }
            }})
        
        return <button style={styles.button}
        onClick={this.props.onClick}
        type={this.props.type}>
            {this.props.name}
        </button>
    }
}

TimerButton.defaultProps = {type: 'button'}

class StartButton extends React.Component {
    startTimer(){
        store.dispatch(startTimer())
    }

    render(){
        return <TimerButton color='chartreuse' onClick={this.startTimer} name='Start' />
    }
}

class StopButton extends React.Component {
    render(){
        return <TimerButton color="red" onClick={this.stopTimer} name="Stop"/>
    }

    stopTimer(){
        store.dispatch(stopTimer(store.getState().timer.interval))
    }
}

class LapButton extends React.Component {
    lapTimer() {
        store.dispatch(lapTimerAction(Date.now()))
    }
    
    render(){
        return <TimerButton
        color="yellow"
        onClick={ this.lapTimer}
        name="Lap" /> 
    }
}

class ResumeButton extends React.Component {
    render(){
        return <TimerButton
        color='chartreuse'
        name="Resume"
        onClick={this.resumeTimer}/>
    }

    resumeTimer() {
        console.log("Resuming Timer")
        store.dispatch(resumeTimer())
    }
}

class ResetButton extends React.Component {
    render() {
        return <TimerButton
        color='orange'
        name='Reset'
        onClick={this.resetTimer}/>
    }

    resetTimer() {
        console.log("Reset Timer")
        store.dispatch(resetTimer())
    }
}


class RecordButton extends React.Component {
    render(){
        // subtle dependency hack here between type=submit and the parent form for use with redux-form so we can get at input field values
        return <TimerButton
        type="submit"
        name="Record"
        color="red"
        onClick={this.recordTimer}
            />
    }

    recordTimer(){
        var state = store.getState()
        store.dispatch(recordTimer(state.timer, state.login.jwt)) // is it necessary to supply this arg ?  is timer available from within the store?
    }
}

class RecordsDisplay extends React.Component {

    getTimings(){
        var state = store.getState()
        store.dispatch(getTimings(state.timer, state.login.jwt))
    }
    render(){
        return <button
        onClick={this.getTimings}> GET TIMINGS </button>
    }
}

/// end TIMER
function isAuthenticated(){
    return store.getState().login.isLoggedIn
}


function requireAuth(nextState, replace) {
    if (!isAuthenticated()) {
        replace({
            pathname: '/', // redirect to some kind of message
            state: { nextPathname: nextState.location.pathname }
                
        })
    }
}

class Profile extends React.Component {
    render(){
        return <UserProfileForm user={store.getState().login.user} />
    }
}

ReactDOM.render(
        <Provider store={store} >
        <div>
        <ActiveTopBar/>
        <Router history={browserHistory} >
        <Route path="/" component={ActiveHome} />
        <Route path="slider" component={OrigSlider} />
        <Route path="profile" component={Profile} onEnter={requireAuth} />
        <Route path="timer" component={ActiveTimer} />
        </Router>
        </div>
        </Provider>,
    document.getElementById('content')
)

