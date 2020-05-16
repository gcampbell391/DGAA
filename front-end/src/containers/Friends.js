import React from "react"
import Header from "../containers/Header"
import history from "../history"
import { connect } from "react-redux"
import { userLogout } from "../actions/userActions"


class Friends extends React.Component {


    //Handles User Log out

    handleLogOutClick = () => {
        fetch("http://localhost:3000/logout")
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                this.props.userLogout(this.props.user)
                history.push("/")
            })
    }

    render() {
        return (
            <div className="welcomeBodyContainer">
                <Header handleLogOutClick={this.handleLogOutClick} />
                <h1>My Friends</h1>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        userLogout: (userData) => dispatch(userLogout(userData))
    }
}
export default connect(null, mapDispatchToProps)(Friends)