import Paper from 'paper'
import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'

import fetch from 'fetch-ponyfill'

import login from './reducers/login'
import {loginAction, logoutAction, getMessage} from './actions/index'

//let _ = require('lodash/fp')
let _ = require('lodash')

console.log(login)

let store = createStore(login,
                        {isLoggedIn: false},
                        applyMiddleware(thunk));

class JWTTest extends React.Component {
    render() {
            return <button onClick={this.fetch_message}>Make Request</button>
    }

    fetch_message(){
        console.log("store is")

        console.log(store.getState().jwt)
        let token = store.getState().jwt
        store.dispatch(getMessage(token))
    }
}


class LoginForm extends React.Component {
    render() {
        if(this.props.loggedIn){
            return <UserProfileForm user={this.props.user}> </UserProfileForm>
        }
        else {
            return <HOFLoginForm> </HOFLoginForm>
        }
    }
}

class UserProfileForm extends React.Component {
    render() {
        return <div>

            <JWTTest></JWTTest>
        
            <div>
            User Name: { this.props.user.username }
        </div>
            <div>
            First Name: { this.props.user.firstName }
        </div>
            <div>
            Last Name: { this.props.user.lastName }
        </div>
            <div>
            Email: { this.props.user.email }
            </div>
            <LogoutButton> </LogoutButton>
            </div>
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
        console.log("successu ");
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

const mapStateToProps = (state) => {
    console.log("state is...")
    console.log(state)
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
        <Provider store={store}>
        <div>
        <ToggleLogin> </ToggleLogin>
        <ColorTarget name='target1' x={55} y={55} size={50} />
        </div>
        </Provider>,
    document.getElementById('content')
)

        
        // document.getElementById('content')
