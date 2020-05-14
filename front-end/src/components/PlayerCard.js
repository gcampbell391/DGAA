import React from "react"



const PlayerCard = (props) => {
    return (
        <div className="playerCard">
            <div className="playerCardPicture">
                <img src={props.user.userImg} id="playerImg" alt={props.user.firstName}></img>
            </div>
            <div className="playerCardDetails">
                <h3>Personal Info</h3>
                <p>Email: {props.user.email}</p>
                <p>First Name: {props.user.firstName} </p>
                <p>Last Name: {props.user.lastName} </p>
                <p>Games Played: 0</p>
            </div>
            <div className="playerCardAddress">
                <h3>Address</h3>
                <p>Street: {props.user.street}</p>
                <p>City: {props.user.city}</p>
                <p>State: {props.user.state}</p>
                <p>Zip: {props.user.zip}</p>
            </div>
        </div>
    )
}

export default PlayerCard