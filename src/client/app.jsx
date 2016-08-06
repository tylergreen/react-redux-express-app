import Paper from 'paper'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'
import fetch from 'fetch-ponyfill'
import ReactInterval from 'react-interval'

import login from './reducers/login'
import {
    loginAction, logoutAction, getMessage,
    saveProfileAction, registerAction,
    startTimer,
    stopTimer,
    resumeTimer,
    resetTimer,
    recordTimer
} from './actions/index'

import { Router, Route, Link, browserHistory } from 'react-router'

//let _ = require('lodash/fp')
let _ = require('lodash')

console.log(login)

let store = createStore(login,
                        {isLoggedIn: false,
                         timer: {
                             state: "Ready"
                         }
                        },
                        applyMiddleware(thunk));

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
        return <div>
            <div>
            User Name: { this.props.user.username }
        </div>
            <div>
            First Name: { this.props.user.firstName }
            <input type="text"
        ref={(c) => this.firstName = c}
            ></input>

        </div>
            <div>
            Last Name: { this.props.user.lastName }

            <input type="text"
        ref={(c) => this.lastName = c}
            ></input>

        </div>
            <div>
            Email: { this.props.user.email }

            <input type="email"
        ref={(c) => this.email= c}
            ></input>

        </div>

            <button onClick={this.submit}>Save Changes</button>
            
            <LogoutButton> </LogoutButton>
            </div>
    }

    submit() {
        store.dispatch(saveProfileAction({
            firstName: ReactDOM.findDOMNode(this.firstName).value,
            lastName: ReactDOM.findDOMNode(this.lastName).value,
            email: ReactDOM.findDOMNode(this.email).value},
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
               
                <ActiveTimer></ActiveTimer>
               <TimerEx2></TimerEx2>

               
               <ToggleLogin></ToggleLogin>
               </div>
              )
    }
}

class Timer extends React.Component {
    render() {
        return <div>
            <h1>Timer</h1>
            <TimerDisplay timer_state={this.props.timer_state}></TimerDisplay>
            <TimerButtons timer_state={this.props.timer_state}></TimerButtons>
          </div>
    }
}

class TimerDisplay extends React.Component {
    constructor(){
        super()
        this.state = {count: 0 }
    
        this.isRunning = this.isRunning.bind(this)
    }

    isRunning() {
        console.log("props are")
        console.log(this.props)
        return this.props.timer_state == 'Running'
    }

    count(){
        if(this.props.timer_state == "Ready")
            this.state.count = 0
        
        return this.state.count
    }

    render() {
        return (
                <div>
                {this.count()}
                <ReactInterval timeout={1000} enabled={this.isRunning()}

            callback={ () => {
                this.state.count += 1
                this.setState(this.state)
            }
                     } />
                </div>)
    }

    

}

class TimerButtons extends React.Component {
    render(){
        return this.updateButtons()
    }

    updateButtons(){
        console.log("updating buttons")
        if(this.isReady()){
            return <StartButton></StartButton>
        } else if (this.isRunning()){
            return <div>
                <StopButton></StopButton>
                <LapButton></LapButton>
                </div>
        } else if (this.isStopped()) {
            return <div>
                <ResumeButton></ResumeButton>
                <ResetButton></ResetButton>
                <RecordButton></RecordButton>
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
    console.log("state is ")
    console.log(state)
    return {
        timer_state: state.timer.state
    }
}

// pattern is do do this for a whole list of componenets
// instead of passing down from parent
let ActiveTimer = connect(mapTimerStateToProps)(Timer)

class StartButton extends React.Component {
    render(){
        return <button onClick={this.startTimer}> Start </button>
    }

    startTimer(){
        console.log("Start Timer")
        store.dispatch(startTimer())
    }
}


class StopButton extends React.Component {
    render(){
        return <button onClick={this.stopTimer}> Stop </button>
    }

    stopTimer(){
        console.log("Stop Timer")
        store.dispatch(stopTimer())
    }
}

class LapButton extends React.Component {
    render(){
        return <button onClick={this.lapTimer}> Lap </button>
    }

    lapTimer(){
        console.log("Lap Timer")
    }
}

class ResumeButton extends React.Component {
    render(){
        return <button onClick={this.resumeTimer}> Resume </button>
    }

    resumeTimer() {
        console.log("Resuming Timer")
        store.dispatch(resumeTimer())
    }
}

class ResetButton extends React.Component {
    render(){
        return <button onClick={this.resetTimer}> Reset </button>
    }

    resetTimer() {
        console.log("Reset Timer")
        store.dispatch(resetTimer())
    }
}


class RecordButton extends React.Component {
    render(){
        return <button onclick={this.recordTimer}> Record </button>
    }

    recordTimer(){
        console.log("recording")
    }
}

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

// react-interval example
class TimerEx2 extends React.Component{
    constructor(){
        super()
        this.state = {count: 0,
                      running: false}

        //this is less than preferable
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
    }

    startTimer(){
        this.setState({running: true})
    }

    stopTimer(){
        this.setState({running: false})
    }
    
    render(){
        const {count} = this.state

        return (
                <div>
                <button onClick={this.startTimer}>Start</button>
                <button onClick={this.stopTimer}> Stop </button>
                {count}
                <ReactInterval timeout={1000} enabled={this.state.running}

            callback={ () => {
                this.state.count += 1
                this.setState(this.state)
            }
                     } />
                </div>
        )
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
        <Route path="/public/" component={Home} />
        <Route path="login" component={ToggleLogin} />
        <Route path="register" component={Registration} />
        <Route path="timer" component={ActiveTimer}
        />
        </Router>
        
        <ColorTarget name='target1' x={55} y={55} size={50} />
        </div>
        </Provider>,
    document.getElementById('content')
)

