import React from "react"
import { Card, Image, Button, Input } from "semantic-ui-react"

class AllUsers extends React.Component {
    constructor() {
        super()
        this.state = {
            sliceIndex: 0,
            updatedUsers: [],
            nameSearchTerm: ""
        }
    }

    componentDidMount() {
        const updatedUsers = this.props.allUsers.filter(user => {
            return user.id !== this.props.currentUser[0].user.id
        })
        this.setState({ updatedUsers: updatedUsers })
    }

    //Splices AllUsers into groups of 5 for display
    allUserSlicer = () => {
        const searchUsers = this.state.updatedUsers.filter(user => {
            return user.firstName.toLowerCase().includes(this.state.nameSearchTerm.toLowerCase())
        })
        return searchUsers.slice(this.state.sliceIndex, this.state.sliceIndex + 5)
    }

    //Handles Friend Back Click
    handleFriendsBackClick = () => {
        this.setState({ sliceIndex: this.state.sliceIndex - 5 })
    }

    //Handles Friend Next Click
    handleFriendsNexClick = () => {
        this.setState({ sliceIndex: this.state.sliceIndex + 5 })
    }

    //Handles Name Search Input Change
    handleNameSearchChange = (event) => {
        this.setState({ nameSearchTerm: event.target.value })
    }

    render() {
        return (
            <div className="allUsersContainer">
                <div className="allUsersSearch">
                    <p className="allUsersHeader">All Users</p>
                    <Input
                        size='large'
                        icon="user"
                        iconPosition="left"
                        placeholder="Search Friends By Name..."
                        id="nameSearch"
                        onChange={(event) => this.handleNameSearchChange(event)}
                    />
                </div>
                <Card.Group itemsPerRow={5}>
                    {this.allUserSlicer().map(user => {
                        return <Card color='yellow'>
                            <Image src={user.userImg} className="usersPictures" />
                            <Card.Content>
                                <Card.Header>{user.firstName}</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Joined in 2020</span>
                                </Card.Meta>
                            </Card.Content>
                            <Card.Content extra>
                                <Button color="green" onClick={() => this.props.handleAddFriendClick(user)}>Follow</Button>
                            </Card.Content>
                        </Card>
                    })}
                </Card.Group>
                <div className="allUsersButtons">
                    {this.state.sliceIndex === 0 ? null : <Button color="yellow" onClick={() => this.handleFriendsBackClick()}>Previous</Button>}
                    {this.state.sliceIndex + 5 > this.state.updatedUsers.length ? null : <Button color="yellow" onClick={() => this.handleFriendsNexClick()}>Next</Button>}
                </div>
            </div >
        )
    }
}

export default AllUsers