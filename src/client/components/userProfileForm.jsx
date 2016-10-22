class UserProfileForm extends React.Component {
    constructor() {
        super()
        
        this.submit = this.submit.bind(this) // react es6 doesn't auto bind methods to itself
    }

    render() {
        let firstName
        let lastName
        let userName
        let email
        console.log("USER is")
        console.log(this.props.user)
                
        return <div>
                <div>
                    User Name: { this.props.user.userName }
                </div>
                <div>
                    First Name: { this.props.user.firstName }
                    <input type="text"
                           ref={(c) => firstName = c} />
                </div>
                
                <div>
                    Last Name: { this.props.user.lastName }

                    <input type="text"
                           ref={(c) => lastName = c} />
                </div>
                <div>
                    Email: { this.props.user.email }

                    <input type="email"
                           ref={(c) => email= c}
                    />
                </div>

                <button onClick={this.submit(firstName, lastName, userName, email)}>Save Changes</button>
            
                <LogoutButton> </LogoutButton>
        </div>
    }
    // could refactor this to take 1 arg instead of 4
    submit(firstName, lastName, userName, email) {
        store.dispatch(saveProfileAction(
            { firstName: firstName,
              lastName: lastName,
              email: email,
              userName: userName},
            store.getState().jwt)) 
    }
}
