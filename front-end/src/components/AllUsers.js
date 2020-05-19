import React from "react"
import { Card, Image, Button } from "semantic-ui-react"


const AllUsers = (props) => {
    console.log("all users:", props.allUsers)
    console.log("user", props.currentUser)
    const updatedUsers = props.allUsers.filter(user => {
        return user.id !== props.currentUser[0].id
    })
    console.log("UpdatedUsers: ", updatedUsers)
    return (
        <div className="allUsersContainer">
            <h1 className="allUsersHeader">All Users</h1>
            <Card.Group itemsPerRow={5}>
                {updatedUsers.map(user => {
                    return <Card color='yellow'>
                        <Image src={user.userImg} style={{ width: 'cover', height: '200px' }} />
                        <Card.Content>
                            <Card.Header>{user.firstName}</Card.Header>
                            <Card.Meta>
                                <span className='date'>Joined in 2020</span>
                            </Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            <Button color="green" onClick={() => props.handleAddFriendClick(user)}>Add Friend</Button>
                        </Card.Content>
                    </Card>
                })}
            </Card.Group>
        </div >
    )
}

export default AllUsers