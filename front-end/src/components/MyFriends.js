import React from "react"
import { Card, Image, Button } from "semantic-ui-react"

const MyFriends = (props) => {
    if (props.updatedFriends.length === 0) {
        return (
            <div className="myFriendsContainer">
                <h1 id="noFriendsHeader">You're not following anyone yet.</h1>
            </div>
        )
    }
    return (
        <div className="myFriendsContainer">
            <h1 className="allUsersHeader">Following</h1>
            <Card.Group itemsPerRow={5} >
                {props.updatedFriends.map(user => {
                    return <Card color='yellow' className="friendCardDetails">
                        <Image src={user.userImg} className="usersPictures" />
                        <Card.Content>
                            <Card.Header>{user.firstName}</Card.Header>
                            <Card.Meta>
                                <span className='date'>Joined in 2020</span>
                            </Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            <Button color="red" onClick={() => props.removeFriendClick(user)}>Stop Following</Button>
                        </Card.Content>
                    </Card>
                })}
            </Card.Group>
        </div >
    )
}


export default MyFriends