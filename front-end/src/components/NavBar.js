import React from "react"
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";





const NavBar = (props) => {
    return (
        <div className="NavBarContainer">
            <NavLink to="/Account_Home" exact ><FontAwesomeIcon icon={faHome} style={{ color: 'limegreen' }} size="4x" className="NavBarIcon" /></NavLink>
            <NavLink to="/My_Friends" exact ><FontAwesomeIcon icon={faUsers} style={{ color: 'limegreen' }} size="4x" className="NavBarIcon" /></NavLink>
            <NavLink to="/" exact ><FontAwesomeIcon icon={faSignOutAlt} style={{ color: 'crimson' }} size="4x" className="NavBarIcon" onClick={props.handleLogOutClick} /></NavLink>
        </div>)
}

export default NavBar