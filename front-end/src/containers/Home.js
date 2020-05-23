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
import { Dimmer, Loader } from 'semantic-ui-react'
import UpdatePassword from '../forms/UpdatePassword'
import swal from 'sweetalert'



class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            currentUser: null,
            mapNameSearchTerm: "",
            mapCitySearchTerm: "",
            mapZipSearchTerm: "",
            renderPCEditForm: false,
            renderPasswordForm: false,
            loading: true
        }
    }

    componentDidMount() {
        this.setState({ currentUser: this.props.user.user })
        setTimeout(() => {
            this.setState({ loading: false })
        }, 1000);
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
        this.setState({ mapNameSearchTerm: event.target.value.toLowerCase() })
    }

    //Handles input change for map filter search for course city
    handleCityFilterChange = (event) => {
        this.setState({ mapCitySearchTerm: event.target.value.toLowerCase() })
    }

    //Handles input change for map filter search for course zip
    handleZipFilterChange = (event) => {
        console.log(event.target.value)
        this.setState({ mapZipSearchTerm: event.target.value })
    }

    //Handles Edit PlayerCard Form Render
    handleEditPCClick = () => {
        this.setState({ renderPCEditForm: true })
    }

    //Handles Close btn on Edit PlayerCard Form
    handlePCFormCloseBtn = () => {
        this.setState({ renderPCEditForm: false })
    }

    //Handles input change on PC Form dynamically
    handleEditPCFormInputChange = (event) => {
        this.setState({ currentUser: { ...this.state.currentUser, [event.target.name]: event.target.value } })
    }

    //Handles close btn on password form
    handlePasswordFormCloseBtn = () => {
        this.setState({ renderPasswordForm: false })
    }

    handleEditPasswordClick = () => {
        this.setState({ renderPasswordForm: true })
    }

    handlePasswordFormSubmit = (event) => {
        event.preventDefault();
        const oldPass = event.target.querySelector("#oldPassword").value
        const newPass = event.target.querySelector("#newPassword").value
        if (oldPass === newPass) {
            return swal("Current Password and New Password Match!", "If you would like to change your password, please select a different password than your current one.", "error");
        }
        const passwordData = {
            oldPass: oldPass,
            newPass: newPass
        }
        fetch(`http://localhost:3000/update_password/${this.state.currentUser.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(passwordData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    return swal("Wrong Current Password!", "Please ensure you enter the correct current password to update to a new one.", "error");

                }
                else {
                    console.log(data)
                    swal("Password Changed!", "Your password has been successfully updated.", "success");
                    this.setState({ currentUser: data })
                    this.setState({ renderPasswordForm: false })
                }
            })

    }

    //Hanldes Submit btn on Edit PlayerCard Form
    handlePCFormEditSubmit = (event) => {
        event.preventDefault();
        const updatedUser = this.state.currentUser
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
        if (this.state.loading) {
            return (
                <div >
                    <Dimmer active>
                        <Loader size='massive'>Loading Home</Loader>
                    </Dimmer>
                </div>
            )
        }
        if (this.state.currentUser) {
            return (
                <div className="welcomeBodyContainer">
                    <Header handleLogOutClick={this.handleLogOutClick} />
                    <AccountHomeMap
                        user={this.state.currentUser}
                        mapNameSearchTerm={this.state.mapNameSearchTerm}
                        mapCitySearchTerm={this.state.mapCitySearchTerm}
                        mapZipSearchTerm={this.state.mapZipSearchTerm}
                    />
                    <UpdatePassword
                        handlePasswordFormCloseBtn={this.handlePasswordFormCloseBtn}
                        renderPasswordForm={this.state.renderPasswordForm}
                        handlePasswordFormSubmit={this.handlePasswordFormSubmit}
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
                        followers={this.props.user.followers}
                        handleNameFilterChange={this.handleNameFilterChange}
                        handleCityFilterChange={this.handleCityFilterChange}
                        handleZipFilterChange={this.handleZipFilterChange}
                        handleEditPCClick={this.handleEditPCClick}
                        handleEditPasswordClick={this.handleEditPasswordClick}
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
