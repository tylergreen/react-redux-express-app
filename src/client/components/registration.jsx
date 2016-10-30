import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import reactCSS from 'reactcss'
import { registerAction } from '../actions/index'
import ButtonStyles from './styles/buttonStyles'
import TopBar from './topBar.jsx'
import AuthenticatedDashboard from './authenticatedDashboard.jsx'

const Registration = ({onRegisterClick, userAuthenticated}) => {
    var email_input,
        password_input

    if(userAuthenticated){
        return <AuthenticatedDashboard/>
    }
    else {
        return (
            <div>
            <TopBar/>
                
            <div style={styles.registration}>
                
                <h1 style={styles.h1}>Register now!</h1>
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
                    ref={(c) => password_input = c}
                />
                
                <button style={ButtonStyles.button}
                        onClick={ () => onRegisterClick(email_input.value, password_input.value) }>
                    Sign Up!
                </button>
                
                <div> Already a member?  Sign in now </div>
            </div>
            </div>
        )
    }
}

const styles = reactCSS({
    'default': {
        registration: {
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
    return {
        userAuthenticated: state.login.isLoggedIn
    }
}


const ActiveRegistration = connect(
    mapStateToProps,
    {onRegisterClick: registerAction}
)(Registration)


export default ActiveRegistration
