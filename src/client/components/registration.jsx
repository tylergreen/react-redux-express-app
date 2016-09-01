import React from 'react'
import ReactDOM from 'react-dom'
import reactCSS from 'reactcss'
import { registerAction } from '../actions/index'

export default class Registration extends React.Component {
    constructor() {
        super()
        
        this.register = this.register.bind(this) // react es6 doesn't auto bind methods to itself
    }

    render(){
        const styles = reactCSS({
            'default': {
                registration: {
                    display: 'flex',
                    flexFlow: 'column',
                }
            }
            })
      
        return (<div style={styles.registration}>
                
                <h1>Register now!</h1>
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
        this.props.store.dispatch(registerAction(email, password))

    }
}


