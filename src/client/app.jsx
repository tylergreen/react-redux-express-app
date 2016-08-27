import Paper from 'paper'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'

import { reduxForm, reducer as formReducer } from 'redux-form'

import fetch from 'fetch-ponyfill'
import reactCSS from 'reactcss'

import login from './reducers/login'
import timerReducer from './reducers/timerReducer'

import {
    loginAction, logoutAction, getMessage,
    saveProfileAction, registerAction,
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

//let _ = require('lodash/fp')
let _ = require('lodash')

console.log(login)

const reducers =  {
    login: login,
    timer: timerReducer,
    form: formReducer //redux-form
}

const reducer = combineReducers(reducers)


// might want to put this in a middleware file somewhere
const timerMiddleware = store => next => action => {
    if (action.type === 'START_TIMER') {
        action.interval = setInterval(() =>
                                      store.dispatch({type: 'TICK',
                                                      currentTime: Date.now() }),
                                      1000);
          
    } else if (action.type === 'STOP_TIMER') {
        clearInterval(action.interval);
    }
    else if (action.type === 'RESUME_TIMER') {
        action.interval = setInterval(() =>
                                      store.dispatch({type: 'TICK',
                                                      currentTime: Date.now() }),
                                      1000);
    }
    next(action);
};

let store = createStore(reducer,
                        applyMiddleware(timerMiddleware,
                                        thunk));

class LoginForm extends React.Component {
    render() {
        if(this.props.loggedIn){
            return <div>
                <UserProfileForm user={this.props.user}> </UserProfileForm>
                </div>
        }
        else {
            return <HOFLoginForm> </HOFLoginForm>
        }
    }
}

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

//change this name please
//class LoginButton extends React.Component {
class HOFLoginForm extends React.Component {
    constructor() {
        super()
        
        this.login = this.login.bind(this) // react es6 doesn't auto bind methods to itself
    }
    
    render() {
        return <div>
            <input
        type="email"
        name="email"
        ref={(c) => this.email_input = c}
        ></input>
            <input
        type="password"
        name="password"
        ref={(c) => this.password_input = c}
            ></input>
            <button onClick={this.login}>
            Login
           </button>
           </div>
    }

    login() {
        console.log("Logging In!")
        console.log("Store state:")
        console.log(store.getState())
        console.log("inputs refs:")
        let email = ReactDOM.findDOMNode(this.email_input).value
        let password =
            ReactDOM.findDOMNode(this.password_input).value
        console.log(email)
        console.log(password)
        store.dispatch(loginAction(email, password))
        // can change this with react-redo connect
        console.log("New state:")
        console.log(store.getState())
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
            fillColor: this.color(this.props.loggedIn),
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
        return(<div>
               <h1> Tyler Rules! </h1>
               <Link to="/register">Sign Up</Link>
               <Link to="/timer">Timer</Link>
               
               <ActiveTimer handleSubmit={recordTimer}></ActiveTimer>
               
               <ColorTarget name='target1' x={55} y={55} size={50} />

               
               <ToggleLogin></ToggleLogin>
               </div>
              )
    }
}


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
        if(this.props.originalTimeStamp)
            return new Date(this.props.originalTimeStamp).toDateString()
        else
            return ""
    }
    
    render() {
        return <div>
            <h1>Timer</h1>
            <TimerLabel/>
            <div> Start Time: {this.startTimeStamp() } </div>
            <TimerDisplay elapsed={format_ms(this.props.elapsed)}/>
            <TimerControl timer_state={this.props.timer_state} label ={ this.props.label }/>
            <LapDisplay lapTimes={this.props.lapTimes}/>

        <RecordsDisplay/>
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
                    fontSize: '2em',
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
        if(this.isReady()){
            return <StartButton></StartButton>
        } else if (this.isRunning()){
            return <div>
                <StopButton/>
                <LapButton/>
                </div>
        } else if (this.isStopped()) {
            return <div>
                <ResumeButton/>
                <RecordButton/>
                <ResetButton/>
                </div>
        }
        
        else {
            console.log("State Error Timer should be in one of 3 states")
            console.log(this.props.timer_state)
            console.log(store.getState())
            
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
                    borderRadius: '28px',
                    border: '1px solid #18ab29',
                    display:'inline-block',
                    cursor:'pointer',
                    color:'#ffffff',
                    fontFamily:'Arial',
                    fontSize:'17px',
                    padding:'16px 31px',
                    textDecoration:'none',
                    textShadow:'0px 1px 0px #2f6627',
                }
            }})
        
        return <button style={styles.button} onClick={this.props.onClick} type={this.props.type}> {this.props.name} </button>
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

class Registration extends React.Component {
    constructor() {
        super()
        
        this.register = this.register.bind(this) // react es6 doesn't auto bind methods to itself
    }

    render(){
        return (<div>
                <h1> Register so we can identify you</h1>
                <div>
                <input
                type="email"
                name="email"
                ref={(c) => this.email_input = c}
                ></input>
                </div>
                <input
                type="password"
                name="password"
                ref={(c) => this.password_input = c}
                ></input>
                <button onClick={this.register}>
                Sign Up!
                </button>
                </div>
        )
    }

    register(){
        let email = ReactDOM.findDOMNode(this.email_input).value
        let password =
            ReactDOM.findDOMNode(this.password_input).value
        store.dispatch(registerAction(email, password))

    }
}

const mapStateToProps = (state) => {
    console.log("state is...")
    console.log(state)
    console.log("user is...")
    console.log(state.user)
    return {
        loggedIn: state.isLoggedIn,
        user: state.user
    }
}

// connect will return a new component
// can get rid of this if we just embed in toggle login
let ColorTarget = connect(
    mapStateToProps
)(Target)

let ToggleLogin = connect(
    mapStateToProps
)(LoginForm)

console.log(document.getElementById('content'));

ReactDOM.render(
        <Provider store={store} >
        <div>
        <Router history={browserHistory} >
        <Route path="/" component={Home} />
        <Route path="login" component={ToggleLogin} />
        <Route path="register" component={Registration} />
        <Route path="timer" component={ActiveTimer}
        />
        </Router>
        </div>
        </Provider>,
    document.getElementById('content')
)

