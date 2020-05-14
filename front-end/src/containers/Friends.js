import React from "react"
import Header from "../containers/Header"


class Friends extends React.Component {


    //Handles User Log out
    handleLogOutClick = () => {
        fetch("http://localhost:3000/logout")
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
            })
    }

    render() {
        return (
            <div>
                <Header handleLogOutClick={this.handleLogOutClick} />
                <h1>My Friends</h1>
            </div>
        )
    }
}
export default Friends