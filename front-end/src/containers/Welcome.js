import React from "react"
import { Container } from 'semantic-ui-react';
import Login from "../forms/Login";
import { connect } from "react-redux"
import { userLogin } from "../actions/userActions"



class Welcome extends React.Component {

    handleLoginSubmit = (event) => {
        // console.log(event.target)
        const userEmail = event.target.querySelector("#emailInput").value
        const userPassword = event.target.querySelector("#passwordInput").value
        const userData = {
            email: userEmail,
            password: userPassword
        }
        this.props.userLogin(userData)
        // fetch('http://localhost:3000/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(userData),
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data)
        //         this.setState({
        //             user: data.user
        //         })
        //     })
        // event.target.reset()
    }


    render() {
        return (
            <Container>
                <Login handleLoginSubmit={this.handleLoginSubmit} />
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return { userLogin: (userData) => dispatch(userLogin(userData)) }
}


export default connect(null, mapDispatchToProps)(Welcome)