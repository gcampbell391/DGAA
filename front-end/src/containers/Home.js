import React from "react"
import Header from "./Header"
import { connect } from "react-redux"
import { userLogin } from "../actions/userActions"
import { userLogout } from "../actions/userActions"
import PlayerCard from "../components/PlayerCard"
import Footer from "../components/Footer"
import AccountHomeMap from "../components/AccountHomeMap"


class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            currentUser: null,
            redirect: true
        }
    }

    componentDidMount() {
        this.setState({ currentUser: this.props.user[0].user })
    }


    //Handles User Log out
    handleLogOutClick = () => {
        fetch("http://localhost:3000/logout")
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                this.setState({ currentUser: null })
                this.props.userLogout(this.props.user)
            })
    }

    render() {
        console.log("Home", this.state.currentUser)
        return (
            <div className="welcomeBodyContainer">
                <Header handleLogOutClick={this.handleLogOutClick} />
                <AccountHomeMap user={this.props.user[0].user} />
                <PlayerCard user={this.props.user[0].user} />
                <Footer />
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


export default connect(mapStateToProps, mapDispatchToProps)(Home)
