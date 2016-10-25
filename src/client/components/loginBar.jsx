import React from 'react'
import ReactDOM from 'react-dom'
import reactCSS from 'reactcss'
import { loginAction } from '../actions/index'
import ButtonStyles from './styles/buttonStyles'
import { Link } from 'react-router'

export default class LoginForm extends React.Component {
    constructor() {
        super()
        this.login = this.login.bind(this)
    }
    
    render() {
        const styles = reactCSS({
            'default': {
                signIn: {
                    color: 'white'
                },
                input: {
                    height: '2em',
                }
            }
            })
      
        return (
            <div>
            <Link style={styles.signIn}
                  to={'/SignIn'}>
                Sign In
            </Link>                  
            <button style={ButtonStyles.button} onClick={this.signUp}>
            Sign Up
           </button>
                </div>
        )
    }

    login() {
        let email = ReactDOM.findDOMNode(this.email_input).value
        let password = ReactDOM.findDOMNode(this.password_input).value
        this.props.store.dispatch(loginAction(email, password))
    }
}

