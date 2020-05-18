import React from "react"
import { connect } from "react-redux"
import Header from "./Header"
import Footer from "../components/Footer";
import AllGames from "../components/AllGames";
import RecentGame from "../components/RecentGame"

class Statistics extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        const userId = this.props.user[0].id
        fetch(`http://localhost:3000/users/${userId}`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({ user: data })
            })
    }

    render() {
        console.log("Statistics User:", this.state.user)

        return (
            <div className="welcomeBodyContainer">
                <Header />
                <div className="statsContainer">
                    <div className="recentGameStats">
                        <RecentGame user={this.state.user} />
                    </div>
                    <div className="allGameStats">
                        <AllGames user={this.state.user} />
                    </div>
                </div>
                <Footer />
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.users
    }
}

export default connect(mapStateToProps)(Statistics)