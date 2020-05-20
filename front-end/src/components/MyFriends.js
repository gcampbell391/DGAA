import React from "react"
import { Card, Image, Button } from "semantic-ui-react"

const MyFriends = (props) => {
    if (props.updatedFriends.length === 0) {
        return (
            <div className="myFriendsContainer">
                <h1 id="noFriendsHeader">No Friends Added Yet.</h1>
            </div>
        )
    }
    return (
        <div className="myFriendsContainer">
            <h1 className="allUsersHeader">My Friends</h1>
            <Card.Group itemsPerRow={5} >
                {props.updatedFriends.map(user => {
                    return <Card color='yellow' className="friendCardDetails">
                        <Image src={user.userImg} style={{ width: 'cover', height: '200px' }} />
                        <Card.Content>
                            <Card.Header>{user.firstName}</Card.Header>
                            <Card.Meta>
                                <span className='date'>Joined in 2020</span>
                            </Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            <Button color="red" onClick={() => props.removeFriendClick(user)}>Remove Friend</Button>
                        </Card.Content>
                    </Card>
                })}
            </Card.Group>
        </div >
    )
}


export default MyFriends