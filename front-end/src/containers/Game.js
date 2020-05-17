import React from "react"
import { connect } from "react-redux"
import { Dimmer, Loader, Image } from 'semantic-ui-react'
import Header from "./Header"
import Footer from "../components/Footer";
import ScoreCard from "../components/ScoreCard";
import CourseDetails from "../components/CourseDetails";
import HoleDetails from "../components/HoleDetails";
import history from "../history"

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            course: null,
            holes: null,
            coursePics: null,
            loading: true,
            currentHole: 1,
            currentUserScoreScard: [],
            loadingNextHole: false,
            currentUserStanding: 0
        }
    }

    componentDidMount() {
        this.setState({
            course: this.props.course,
            coursePics: this.props.courseImgs,
            holes: this.props.course["length"] - 1,
        })
        setTimeout(() => {
            this.setState({ loading: false })
        }, 1000);
    }

    handleSubmitHoleBtn = (event) => {
        event.preventDefault();
        const currentHole = this.state.course[this.state.currentHole]
        const teeSelection = event.target.querySelector("#teeHoleInput").querySelector(".text").innerText
        const teeNumber = teeSelection.split(" ")[1]
        const holePar = currentHole[`tee_${teeNumber}_par`]
        const strokeCount = parseInt(event.target.querySelector("#strokeHoleInput").querySelector(".text").innerText)
        const strokeParDifference = parseInt(holePar) - strokeCount
        this.setState({ currentUserStanding: this.state.currentUserStanding - strokeParDifference })
        const userHoleInfo = {
            hole: this.state.currentHole,
            stroke: strokeCount,
            par: holePar,
        }
        console.log("User Data:", userHoleInfo)
        this.setState({ currentUserScoreScard: [...this.state.currentUserScoreScard, userHoleInfo] })
        this.setState({ loadingNextHole: true })
        event.target.reset()
        setTimeout(() => {
            this.setState({ currentHole: this.state.currentHole + 1 })
            this.setState({ loadingNextHole: false })
        }, 1000);
        debugger
        //Finishes game..need to send info to back end to log game info
        if (this.state.currentHole >= this.state.holes) {
            console.log("Game Completed!!!")
            console.log("Final ScoreCard: ", [...this.state.currentUserScoreScard, userHoleInfo])
            history.push("/Account_Home")
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <div >
                    <Dimmer active>
                        <Loader size='massive'>Starting Game</Loader>
                    </Dimmer>
                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                </div>
            )
        }
        if (this.state.loadingNextHole) {
            return (
                <div >
                    <Dimmer active>
                        <Loader size='massive'>Loading Next Hole</Loader>
                    </Dimmer>
                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                </div>
            )
        }
        if (this.state.course !== null) {
            return (
                <div className="welcomeBodyContainer">
                    <Header />
                    <div className="gameContainer">
                        <CourseDetails
                            course={this.state.course[0]}
                            coursePics={this.state.coursePics}
                        />
                        <HoleDetails
                            hole={this.state.course[this.state.currentHole]}
                            handleSubmitHoleBtn={this.handleSubmitHoleBtn}
                            currentUserStanding={this.state.currentUserStanding}
                        />
                    </div>
                    <ScoreCard
                        currentUserScoreScard={this.state.currentUserScoreScard}
                    />
                    <Footer />
                </div>
            )
        }
    }
}


const mapStateToProps = state => {
    return {
        course: state.courses[0],
        courseImgs: state.courses[1]
    }
}

export default connect(mapStateToProps)(Game)
