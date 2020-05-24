import React from "react"
import MapSearch from "../forms/MapSearch"
import { Button } from 'semantic-ui-react'



const PlayerCard = (props) => {
    return (
        <div className="HomeBody">
            <div className="playerCard">
                <div className="playerCardPicture">
                    <img src={props.user.userImg} id="playerImg" alt={props.user.firstName}></img>
                    <Button content='Update PlayerCard' icon='address card' labelPosition='left' onClick={props.handleEditPCClick} color="green" />
                </div>
                <div className="playerCardDetails">
                    <h3 id="playerCardHeader">Personal Info</h3>
                    <p>Email: {props.user.email}</p>
                    <p>First Name: {props.user.firstName} </p>
                    <p>Last Name: {props.user.lastName} </p>
                    <p>Followers: {props.followers}</p>
                    <div className="userUpdatedBtns">
                        <Button content='Update Password' icon='lock' labelPosition='left' onClick={props.handleEditPasswordClick} color="yellow" />
                    </div>
                </div>
                <div className="playerCardAddress">
                    <h3 id="playerCardHeader">Address</h3>
                    <p>Street: {props.user.street}</p>
                    <p>City: {props.user.city}</p>
                    <p>State: {props.user.state}</p>
                    <p>Zip: {props.user.zip}</p>
                </div>
            </div>
            <div className="mapFilterContainer">
                <MapSearch
                    handleNameFilterChange={props.handleNameFilterChange}
                    handleCityFilterChange={props.handleCityFilterChange}
                    handleZipFilterChange={props.handleZipFilterChange}
                />
            </div>
        </div>
    )
}

export default PlayerCard