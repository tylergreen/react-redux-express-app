import Paper from 'paper'
import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'

import fetch from 'fetch-ponyfill'

import login from './reducers/login'
import {loginAction, logoutAction} from './actions/index'

//let _ = require('lodash/fp')
let _ = require('lodash')

console.log(login)

let store = createStore(login,
                        {isLoggedIn: false},
                        applyMiddleware(thunk));


class LoginForm extends React.Component {
    render() {
        if(this.props.loggedIn){
            return <LogoutButton> </LogoutButton>
        }
        else {
            return <div>
                <input type="email" name="email"></input>
                <input type="password" name="password"></input>
                <LoginButton> </LoginButton>
                </div>
        }
    }
}

class LoginButton extends React.Component {
    render() {
        return <button onClick={this.login}
            >Login
        </button>
    }

    login() {
        console.log("Logging In!")
        console.log("Store state:")
        console.log(store.getState())
        store.dispatch(loginAction("Tyler", "xxxxx")) // change this to props are something
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
        console.log("Logging Out Bye!")
        console.log("Store state:")
        console.log(store.getState())
        store.dispatch(logoutAction("monkey@gmail")) // change this to props are something
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
    return {
        loggedIn: state.isLoggedIn
    }
}

// connect will return a new component
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
