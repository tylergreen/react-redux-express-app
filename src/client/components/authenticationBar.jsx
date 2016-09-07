import React, { PropTypes, Component } from 'react'
import reactCSS from 'reactcss'
import Registration from './registration.jsx'
import LoginForm from './loginForm.jsx'

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

        if(this.props.authorizationStatus){
            return <div> Welcome {this.props.user.firstName} ! {this.props.user.email} </div>
        } else {
            return <div style={styles.container}>
                <Registration store={this.props.store}/>
                <LoginForm store={this.props.store}/>
                </div>
        }
    }
}
    
        

        


