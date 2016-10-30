import React, { PropTypes, Component } from 'react'
import reactCSS from 'reactcss'
import Registration from './registration.jsx'
import LoginForm from './loginForm.jsx'
import { Link } from 'react-router'

export default class extends Component{
    render(){
        const styles = reactCSS({
            'default': {
                container: {
                    display: 'flex',
                    justifyContent: 'space-around',
                    margin: '1em'
                }
            }
        })
        
        return <div style={styles.container}>
            <Registration />
            <LoginForm />
            </div>
    }
}
    
        

        


