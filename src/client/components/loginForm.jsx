import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import reactCSS from 'reactcss'
import { loginAction } from '../actions/index'
import ButtonStyles from './styles/buttonStyles'
import TopBar from './topBar.jsx'
import AuthenticatedDashboard from './authenticatedDashboard.jsx'


const LoginForm = ({onLoginClick, userAuthenticated}) => {

    var email_input,
        password_input

    if(userAuthenticated){
        return <AuthenticatedDashboard/>
    }
    else {
        console.log('not authenticated')
        return (
            <div>
                <TopBar/>
                    
                <div style={styles.login}>
                    <h1 style={styles.h1}>Sign In</h1>
                    Email:
                    <input
                        style={styles.input}
                        type="email"
                        name="email"
                        ref={(c) => email_input = c}
                    />
                    Password:
                    <input
                        style={styles.input}
                        type="password"
                        name="password"
                        ref={(c) => password_input = c }
                    />
                    
                    <button
                        style={ButtonStyles.button}
                        onClick={ () => onLoginClick(email_input.value, password_input.value) }>
                        Sign In
                    </button>
                    
                    <div> Not a member?  Join now for free </div>

                    <div> Forgot Password? </div>
                </div>
            </div>
        )
    }
}

const styles = reactCSS({
    'default': {
                login: {
                    display: 'flex',
                    flexFlow: 'column',
                    alignItems: 'center',
                    margin: '1em'
                },
                input: {
                    width: '20em'
                },
                h1: {
                    margin: '1em'
                }
            }
})

const mapStateToProps = (state) => {
    console.log('state is')
    console.log(state)
    return {
        userAuthenticated: state.login.isLoggedIn
    }
}

const ActiveLoginForm = connect(
    mapStateToProps,
    {onLoginClick: loginAction}
)(LoginForm)

export default ActiveLoginForm 


