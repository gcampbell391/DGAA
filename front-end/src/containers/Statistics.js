import React from "react"
import { connect } from "react-redux"
import Header from "./Header"
import Footer from "../components/Footer";
import AllGames from "../components/AllGames";
import RecentGame from "../components/RecentGame"
import { Dimmer, Loader } from 'semantic-ui-react'
import AllGameStats from "../components/AllGameStats";

class Statistics extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            loading: true,
            renderAllGames: false,
            allScorecards: [],
            allGames: [],
            gameID: 1
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

    HandleAllGamesBtnClick = () => {
        this.setState({ renderAllGames: true })
        const userID = this.props.user[0].user.id
        fetch(`http://localhost:3000/users/${userID}`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    allScorecards: data.scorecards,
                    allGames: data.games
                })
            })
    }

    handleAllGameCloseBtn = () => {
        this.setState({ renderAllGames: false })
    }

    filterScoreCards = () => {
        if (this.state.allScorecards !== []) {
            return this.state.allScorecards.filter(sc => {
                return sc.game_id === this.state.gameID
            })
        }
    }

    handleNextGameResults = () => {
        this.setState({ gameID: this.state.gameID + 1 })
    }

    handlePreviousGameResults = () => {
        this.setState({ gameID: this.state.gameID - 1 })
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
                            <AllGames
                                user={this.props.user}
                                HandleAllGamesBtnClick={this.HandleAllGamesBtnClick}
                            />
                            <AllGameStats
                                renderAllGames={this.state.renderAllGames}
                                handleAllGameCloseBtn={this.handleAllGameCloseBtn}
                                games={this.state.allGames}
                                scorecards={this.filterScoreCards()}
                                gameID={this.state.gameID}
                                handleNextGameResults={this.handleNextGameResults}
                                handlePreviousGameResults={this.handlePreviousGameResults}
                                currentCourseName={this.state.user.dg_courses[this.state.gameID - 1].name}
                            />
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