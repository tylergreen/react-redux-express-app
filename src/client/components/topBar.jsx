import React, { PropTypes, Component } from 'react'
import reactCSS from 'reactcss'
import Logo from './logo.jsx'
import LoginBar from './loginBar.jsx'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class TopBar extends Component{
    render(){

        return <div style={styles.container}>
    <div style={styles.leftSide}>
        <Logo/>
        <div style={styles.h1}> Habit Hookup! </div>
    </div>
    <UserControlButtons authenticated={this.props.authenticated}/>
       </div>
    }
}

class UserControlButtons extends React.Component {
    render(){
        if(!this.props.authenticated){
            return (
                <LoginBar store={this.props.store}/>
            )
        } else {
            return <Link
                       style={styles.link}
                       to="/profile">
                    Edit profile </Link>

        }
    }
}

const ActiveTopBar = connect(
    (state) => {
        return {
            authenticated: state.login.isLoggedIn,
        }
    }
)(TopBar)

const styles = reactCSS({
    'default': {
        container: {
            background: 'green',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        h1: {
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            fontSize: '2em',
        },
        leftSide: {
            display: 'flex',
            flexFlow: 'row'
        },
        link: {
            color: '#FFF',
            marginRight: '1em'
            
        }
    }
})


export default ActiveTopBar
