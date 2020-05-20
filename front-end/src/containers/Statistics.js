import React from "react"
import { connect } from "react-redux"
import Header from "./Header"
import Footer from "../components/Footer";
import AllGames from "../components/AllGames";
import RecentGame from "../components/RecentGame"
import { Dimmer, Loader } from 'semantic-ui-react'

class Statistics extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            loading: true
        }
    }

    componentDidMount() {
        const userId = this.props.user[0].user.id
        fetch(`http://localhost:3000/users/${userId}`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({ user: data })
            })
        setTimeout(() => {
            this.setState({ loading: false })
        }, 1000);
    }

    render() {
        if (this.state.loading) {
            return (
                <div >
                    <Dimmer active>
                        <Loader size='massive'>Loading Statistics</Loader>
                    </Dimmer>
                </div>
            )
        }
        if (this.state.user.games.length > 0) {
            return (
                <div className="welcomeBodyContainer">
                    <Header />
                    <div className="statsContainer">
                        <div className="recentGameStats">
                            <RecentGame user={this.state.user} />
                        </div>
                        <div className="allGameStats">
                            <AllGames user={this.props.user} />
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        }
        else {
            return (
                <div className="welcomeBodyContainer">
                    <Header />
                    <div className="noStatsContainer">
                        <h1 className="noStatsHeader">No Statistics Yet</h1>
                    </div>
                    <Footer />
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.users
    }
}

export default connect(mapStateToProps)(Statistics)