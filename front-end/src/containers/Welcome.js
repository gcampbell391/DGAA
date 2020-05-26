import React from "react"
import Login from "../forms/Login";
import { connect } from "react-redux"
import { userLogin } from "../actions/userActions"
import { userLogout } from "../actions/userActions"
import { userSignUp } from "../actions/userActions"
import Header from "../containers/Header"
import { Redirect } from "react-router-dom";
import SignUpModal from "./SignUpModal";


class Welcome extends React.Component {
    constructor() {
        super()
        this.state = {
            showLoginError: false,
            renderSignUpForm: false
        }
    }

    //Handles Log In for User at Welcome
    handleLoginSubmit = (event) => {
        // console.log(event.target)
        const userEmail = event.target.querySelector("#emailInput").value
        const userPassword = event.target.querySelector("#passwordInput").value
        const userData = {
            email: userEmail,
            password: userPassword
        }
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                data.status === 401 ? this.timeoutAlertHelper() : this.props.userLogin(data)
            })
        event.target.reset()
    }

    //Helper method for Invalid Login to display error message for 5 seconds
    timeoutAlertHelper = () => {
        this.setState({ showLoginError: true })
        setTimeout(() => {
            this.setState({ showLoginError: false })
        }, 5000);
    }

    //Handles User Log out
    handleLogOutClick = () => {
        fetch("http://localhost:3000/logout")
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                this.props.userLogout(this.props.user.user)
            })
    }


    //Handles Sign Up Click
    handleSignUpClick = () => {
        this.setState({ renderSignUpForm: true })
    }

    //Handles Close btn on Sign Up Modal
    handleSignUpCloseBtn = () => {
        this.setState({ renderSignUpForm: false })
    }

    //Handles Submit btn on Sign Up Modal
    handleSignUpSubmit = (event) => {
        event.preventDefault()
        const newUser = this.createNewUserFromSignUp(event)
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
            .then(response => response.json())
            .then(data => {
                this.props.userSignUp(data)
                this.setState({ renderSignUpForm: false })
            })
    }

    //Helper Method to Create New User from Sign Up
    createNewUserFromSignUp = (event) => {
        const userEmail = event.target.querySelector("#email").value
        const userPass = event.target.querySelector("#passwordInput").value
        const userImg = event.target.querySelector("#userImg").value
        const userFName = event.target.querySelector("#firstName").value
        const userLName = event.target.querySelector("#lastName").value
        const userStreet = event.target.querySelector("#street").value
        const userCity = event.target.querySelector("#city").value
        const userState = event.target.querySelector("#state").value
        const userZip = event.target.querySelector("#zip").value
        const newUser = {
            email: userEmail,
            password: userPass,
            firstName: userFName,
            lastName: userLName,
            street: userStreet,
            city: userCity,
            state: userState,
            zip: userZip,
            userImg: userImg
        }
        return newUser
    }

    render() {
        if (this.props.user.length > 0) {
            return <Redirect to="/Account_Home" />
        }
        return (
            <div className="welcomeBodyContainer">
                <Header handleLogOutClick={this.handleLogOutClick} />
                <SignUpModal
                    renderSignUpForm={this.state.renderSignUpForm}
                    handleSignUpCloseBtn={this.handleSignUpCloseBtn}
                    handleSignUpSubmit={this.handleSignUpSubmit}
                />
                <Login
                    handleLoginSubmit={this.handleLoginSubmit}
                    showLoginError={this.state.showLoginError}
                    handleSignUpClick={this.handleSignUpClick}
                />
                <div id="DGAAMotto">
                    <img src={require("../images/DGAAMoto.png")} alt="DGAA Motto" id="DGAAMottoImage"></img>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogin: (userData) => dispatch(userLogin(userData)),
        userLogout: (userData) => dispatch(userLogout(userData)),
        userSignUp: (userData) => dispatch(userSignUp(userData))
    }
}

const mapStateToProps = state => {
    return { user: state.users }
}


export default connect(mapStateToProps, mapDispatchToProps)(Welcome)