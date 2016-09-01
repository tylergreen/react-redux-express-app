import React from 'react'
import ReactDOM from 'react-dom'
import reactCSS from 'reactcss'
import { loginAction } from '../actions/index'


export default class LoginForm extends React.Component {
    constructor() {
        super()
        this.login = this.login.bind(this)
    }
    
    render() {
        const styles = reactCSS({
            'default': {
                login: {
                    display: 'flex',
                    flexFlow: 'column',
                }
            }
            })
      
        return <div style={styles.login}>
            <h1>Sign In</h1>
            Email:
            <input
        type="email"
        name="email"
        ref={(c) => this.email_input = c}
            />
            Password:
            <input
        type="password"
        name="password"
        ref={(c) => this.password_input = c}
            />
            <button onClick={this.login}>
            Login
           </button>
           </div>
    }

    login() {
        let email = ReactDOM.findDOMNode(this.email_input).value
        let password = ReactDOM.findDOMNode(this.password_input).value
        this.props.store.dispatch(loginAction(email, password))
    }
}

