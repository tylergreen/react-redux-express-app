import Paper from 'paper'
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


class UserProfileForm extends React.Component {
    constructor() {
        super()
        
        this.submit = this.submit.bind(this) // react es6 doesn't auto bind methods to itself
    }

    render() {
        let firstName
        let lastName
        let userName
        let email
        console.log("USER is")
        console.log(this.props.user)
                
        return <div>
            <div>
            User Name: { this.props.user.userName }
        </div>
            <div>
            First Name: { this.props.user.firstName }
            <input type="text"
        ref={(c) => firstName = c}
            ></input>

        </div>
            <div>
            Last Name: { this.props.user.lastName }

            <input type="text"
        ref={(c) => lastName = c}
            ></input>

        </div>
            <div>
            Email: { this.props.user.email }

            <input type="email"
        ref={(c) => email= c}
            ></input>

        </div>

            <button onClick={this.submit(firstName, lastName, userName, email)}>Save Changes</button>
            
            <LogoutButton> </LogoutButton>
            </div>
    }
    // could refactor this to take 1 arg instead of 4
    submit(firstName, lastName, userName, email) {
        store.dispatch(saveProfileAction(
            { firstName: firstName,
              lastName: lastName,
              email: email,
              userName: userName},
            store.getState().jwt)) 
    }
}


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

class Target extends React.Component {
    render() {
        return <canvas id={this.props.name}></canvas> ;
    }

    componentDidMount() {
        this.drawPaperCircle();
    }
    componentDidUpdate() {
        this.drawPaperCircle();
    }
           
    drawPaperCircle() {
        console.log("printing this");
        console.log(this);
        let canvas = document.getElementById(this.props.name);
        
        Paper.setup(canvas); // 

        let path = new Paper.Path();

        let myCircle = new Paper.Path.Circle(new Paper.Point(parseInt(this.props.x), this.props.y), this.props.size);
        myCircle.style = {
            fillColor: this.color(this.props.userAuthenticated),
            strokeColor: 'black',
            strokeWidth: 10,
        }
        
        Paper.view.draw();
        console.log("successu ")
    }

    color(isLoggedIn) {
        if(isLoggedIn){
            return 'green'
        }
        else {
            return 'red'
        }
    }
}

class TodoList extends React.Component {
    render() {
        return <div>
            <input type="Text"></input>
            <button>Add</button>
            <ItemList> </ItemList>
            </div>
    }
}

class TodoItem extends React.Component {
    render() {
            <div>
            {this.props.text} 
            <button> remove </button>
            </div>
    }
}


class Home extends React.Component {
    render(){
        const styles = reactCSS({
            'default': {
                container: {
                    display: 'flex',
                    justifyContent: 'space-between',
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
        return(<div>
               
               <AuthenticationBar authorizationStatus={this.props.userAuthenticated}
               user={this.props.user}
               store={store} />

               <div style={styles.container}>

               <div style={styles.timer}>
               <ActiveTimer handleSubmit={recordTimer} />
               </div>

               <div style={styles.timeChart}>
               
               <TimeChart
               chartData={this.props.chartData}
               store={store}/>
               
               </div>

               </div>

               <div style={styles.links} >
                 <Link to="/timer">Timer</Link>
               <Link to="/slider">Slider</Link>

               </div>
               
               
               </div>
              )
    }
}

const mapStateToProps = (state) => {
    console.log("state is...")
    console.log(state)
    console.log("user is...")
    console.log(state.login.user)
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



function format_ms(milliseconds){
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
            return `${date.toDateString()} ${date.toTimeString()}`
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
                    alignItems: 'left',
                    width: '60%'
                    
                }
            }
        })
        return <div style={styles.timer}>
            <h1>Timer</h1>
            <TimerLabel/>
            <div>Start Time: {this.startTimeStamp() } </div>
            <TimerDisplay elapsed={format_ms(this.props.elapsed)}/>
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
                return <li key={lap}> {format_ms(lap)} </li>
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
        return <div>
            Timer Label: <input type="text" onChange={this.handleChange} ></input>
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
                    justifyContent: 'center'
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
        <TopBar/>
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

