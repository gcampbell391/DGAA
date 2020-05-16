import React from "react"
import Header from "./Header"
import { connect } from "react-redux"
import { userUpdate } from "../actions/userActions"
import { userLogout } from "../actions/userActions"
import PlayerCard from "../components/PlayerCard"
import Footer from "../components/Footer"
import AccountHomeMap from "../components/AccountHomeMap"
import EditPCModal from "./EditPCModal"
import history from "../history"


class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            currentUser: null,
            mapNameSearchTerm: "",
            mapCitySearchTerm: "",
            renderPCEditForm: false
        }
    }

    componentDidMount() {
        this.setState({ currentUser: this.props.user })
    }


    //Handles User Log out
    handleLogOutClick = () => {
        fetch("http://localhost:3000/logout")
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                this.setState({ currentUser: null })
                this.props.userLogout(this.props.user)
                history.push("/")
            })
    }

    //Handles input change for map filter search for course name
    handleNameFilterChange = (event) => {
        this.setState({ mapNameSearchTerm: event.target.value })
    }

    //Handles input change for map filter search for course city
    handleCityFilterChange = (event) => {
        this.setState({ mapCitySearchTerm: event.target.value })
    }

    //Handles Edit PlayerCard Form Render
    handleEditPCClick = () => {
        this.setState({ renderPCEditForm: true })
    }

    //Handles Close btn on Edit PlayerCard Form
    handlePCFormCloseBtn = () => {
        this.setState({ renderPCEditForm: false })
    }

    //
    handleEditPCFormInputChange = (event) => {
        this.setState({ currentUser: { ...this.state.currentUser, [event.target.name]: event.target.value } })
    }

    //Hanldes Submit btn on Edit PlayerCard Form
    handlePCFormEditSubmit = (event) => {
        event.preventDefault();
        const userPassword = event.target.querySelector("#passwordInput").value
        const updatedUser = { ...this.state.currentUser, password: userPassword }
        fetch(`http://localhost:3000/users/${this.state.currentUser.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ currentUser: data.user })
                this.setState({ renderPCEditForm: false })
                this.props.userUpdate(this.state.currentUser)
            })
    }


    render() {
        console.log("Home", this.state.currentUser)
        if (this.state.currentUser) {
            return (
                <div className="welcomeBodyContainer">
                    <Header handleLogOutClick={this.handleLogOutClick} />
                    <AccountHomeMap
                        user={this.state.currentUser}
                        mapNameSearchTerm={this.state.mapNameSearchTerm}
                        mapCitySearchTerm={this.state.mapCitySearchTerm}
                    />
                    <EditPCModal
                        currentUser={this.state.currentUser}
                        renderPCEditForm={this.state.renderPCEditForm}
                        handlePCFormCloseBtn={this.handlePCFormCloseBtn}
                        handlePCFormEditSubmit={this.handlePCFormEditSubmit}
                        handleEditPCFormInputChange={this.handleEditPCFormInputChange}
                    />
                    <PlayerCard
                        user={this.state.currentUser}
                        handleNameFilterChange={this.handleNameFilterChange}
                        handleCityFilterChange={this.handleCityFilterChange}
                        handleEditPCClick={this.handleEditPCClick}
                    />
                    <Footer />
                </div>
            )
        }
        else {
            return (
                <div>
                    <h1>No Current User</h1>
                </div>
            )
        }

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        userUpdate: (userData) => dispatch(userUpdate(userData)),
        userLogout: (userData) => dispatch(userLogout(userData))
    }
}

const mapStateToProps = state => {
    return { user: state.users[0] }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)