import React from "react"
import NavBar from "../components/NavBar"

const Header = (props) => {
    return (
        <div id="headerContainer">
            <img src={require("../images/DGAALogo.png")} id="DGAALogo" alt="DGAA Logo"></img>
            <NavBar handleLogOutClick={props.handleLogOutClick} />
        </div>
    )
}

export default Header