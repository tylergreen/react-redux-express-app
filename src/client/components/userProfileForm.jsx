import reactCSS from 'reactcss'
import Logo from './logo.jsx'
import LoginBar from './loginBar.jsx'
import TopBar from './topBar.jsx'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { saveProfileAction } from '../actions/index'

const UserProfileForm = ({user}) => {
    
    var firstName,
        lastName,
        userName,
        email

    return (
        <div>
            <TopBar/>
            <div style={styles.container}>
                <div>
                    First Name: { user.firstName }
                    <input type="text"
                           ref={(c) => firstName = c} />
                </div>
                
                <div>
                    Last Name: { user.lastName }
                    
                    <input type="text"
                           ref={(c) => lastName = c} />
                </div>
                
                <div>
                    Email: { user.email }

                    <input type="email"
                           ref={(c) => email = c}
                    />
                </div>

                <button onClick={ () => saveProfileClick(firstName.value, lastName.value, email.value)}>Save Changes</button>

                <Link to="/">Back to Dashboard</Link>
            </div>
        </div>
    )
}

const styles = reactCSS({
    'default': {
        container: {
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'center'
        },
        h1: {
            color: '#FFF',
            fontSize: '3em'
        },
        links: {
            display: 'flex',
            justifyContent: 'space-around',
            margin: '1em'
        },
        timer: {
            display: 'flex',
            justifyContent: 'center',
        }
    }
})


const mapStateToProps = (state) => {
    console.log("state is")
    console.log(state)
    return {
        user: state.user
    }
}

const ActiveUserProfileForm = connect(
    mapStateToProps,
    {saveProfileClick: saveProfileAction}
)(UserProfileForm)

export default ActiveUserProfileForm
