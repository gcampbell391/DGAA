import React from "react"
import Header from "../containers/Header"
import history from "../history"
import { connect } from "react-redux"
import { userLogout } from "../actions/userActions"
import MyFriends from "../components/MyFriends"
import AllUsers from "../components/AllUsers"
import { Dimmer, Loader } from 'semantic-ui-react'


class Friends extends React.Component {
    constructor() {
        super()
        this.state = {
            allUsers: [],
            myFriends: [],
            updatedFriends: [],
            currentUser: null,
            loading: true
        }
    }


    componentDidMount() {
        const currentUserID = this.props.currentUser[0].user.id
        console.log("Current User ID: ", currentUserID)
        fetch("http://localhost:3000/users")
            .then(resp => resp.json())
            .then(data => {
                this.setState({ allUsers: data })
            })
        fetch(`http://localhost:3000/users/${currentUserID}`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    currentUser: data,
                    myFriends: data.user_friends
                })
                this.fetchFriends()
            })
        setTimeout(() => {
            this.setState({ loading: false })
        }, 3000);
    }


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

    //Handles action to add friend 
    handleAddFriendClick = (friend) => {
        const friendship = {
            user_id: this.props.currentUser[0].user.id,
            friend_id: friend.id
        }
        console.log("Add Friend: ", friend)
        fetch('http://localhost:3000/users/add_friend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(friendship),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (this.state.myFriends.length > 0) {
                    debugger
                    //Need to fix this error of adding friend who is already a friend
                    if (this.state.myFriends[0].friend_id === data.friendship1.friend_id) {
                        console.log("You are friends already..")
                        return this.state.myFriends
                    }
                    else {
                        this.setState({ myFriends: [...this.state.myFriends, data.friendship1] })
                        fetch(`http://localhost:3000/users/${data.friendship1.friend_id}`)
                            .then(resp => resp.json())
                            .then(data => {
                                this.setState({ updatedFriends: [...this.state.updatedFriends, data] })
                            })
                    }
                }
                else {
                    this.setState({ myFriends: [...this.state.myFriends, data.friendship1] })
                    fetch(`http://localhost:3000/users/${data.friendship1.friend_id}`)
                        .then(resp => resp.json())
                        .then(data => {
                            this.setState({ updatedFriends: [...this.state.updatedFriends, data] })
                        })
                }
            })
    }


    //Helper method to fetch user friends
    fetchFriends = () => {
        this.state.myFriends.forEach(friend => {
            fetch(`http://localhost:3000/users/${friend.friend_id}`)
                .then(resp => resp.json())
                .then(data => {
                    this.setState({ updatedFriends: [...this.state.updatedFriends, data] })
                })
        })
    }

    //Function to remove a friend
    removeFriendClick = (selectedFriend) => {
        const deleteFriend = this.state.myFriends.filter(friend => {
            return friend.friend_id === selectedFriend.id
        })
        console.log("Delete friend: ", deleteFriend)
        const updatedMyFriends = this.state.myFriends.filter(friend => {
            return friend.friend_id !== selectedFriend.id
        })
        console.log("updatedFriends: ", updatedMyFriends)
        this.setState({ myFriends: updatedMyFriends })
        const updatedFriends = this.state.updatedFriends.filter(friend => {
            return friend.id !== selectedFriend.id
        })
        this.setState({ updatedFriends: updatedFriends })
        fetch('http://localhost:3000/users/remove_friend/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deleteFriend),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    }


    render() {
        if (this.state.loading) {
            return (
                <div >
                    <Dimmer active>
                        <Loader size='massive'>Loading Friends</Loader>
                    </Dimmer>
                </div>
            )
        }
        return (
            <div className="friendsBodyContainer" >
                <Header handleLogOutClick={this.handleLogOutClick} />
                <MyFriends
                    updatedFriends={this.state.updatedFriends}
                    removeFriendClick={this.removeFriendClick}
                />
                <AllUsers
                    allUsers={this.state.allUsers}
                    currentUser={this.props.currentUser}
                    handleAddFriendClick={this.handleAddFriendClick}
                />
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return { currentUser: state.users }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userLogout: (userData) => dispatch(userLogout(userData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Friends)