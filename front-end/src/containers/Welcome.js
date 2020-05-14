import React from "react"
import { Container } from 'semantic-ui-react';
import Login from "../forms/Login";
import { connect } from "react-redux"
import { userLogin } from "../actions/userActions"
import { userLogout } from "../actions/userActions"
import Header from "../containers/Header"
import { Redirect } from "react-router-dom";


class Welcome extends React.Component {
    constructor() {
        super()
        this.state = {
            showLoginError: false
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

    render() {
        console.log("Current User:", this.props.user.length)
        if (this.props.user.length > 0) {
            return <Redirect to="/Account_Home" />
        }
        return (
            <div className="welcomeBodyContainer">
                <Header handleLogOutClick={this.handleLogOutClick} />
                <Container>
                    <Login handleLoginSubmit={this.handleLoginSubmit} showLoginError={this.state.showLoginError} />
                </Container>
                <div id="DGAAMotto">
                    <img src={require("../images/DGAAMoto.png")} alt="DGAA Motto"></img>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogin: (userData) => dispatch(userLogin(userData)),
        userLogout: (userData) => dispatch(userLogout(userData))
    }
}

const mapStateToProps = state => {
    return { user: state.users }
}


export default connect(mapStateToProps, mapDispatchToProps)(Welcome)