import React from "react"
import { connect } from "react-redux"
import { Dimmer, Loader } from 'semantic-ui-react'
import Header from "./Header"
import Footer from "../components/Footer";
import ScoreCard from "../components/ScoreCard";
import CourseDetails from "../components/CourseDetails";
import HoleDetails from "../components/HoleDetails";
import swal from 'sweetalert';
import history from "../history"

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            course: {
                name: "Loading..."
            },
            holes: null,
            coursePics: {
                course_photo_url_medium: require("../images/DGCourseDefault.jpeg"),
                course_photo_caption: "Loading..."
            },
            loading: true,
            currentHole: 1,
            currentUserScoreScard: [],
            loadingNextHole: false,
            currentUserStanding: 0,
            currentUser: null
        }
    }

    componentWillMount() {
        this.setState({
            course: this.props.course,
            coursePics: this.props.courseImgs,
            holes: this.props.course["length"] - 1,
            currentUser: this.props.currentUser
        })
        setTimeout(() => {
            this.setState({ loading: false })
        }, 2000);
    }

    handleSubmitHoleBtn = (event) => {
        event.preventDefault();
        const currentHole = this.state.course[this.state.currentHole]
        const teeSelection = event.target.querySelector("#teeHoleInput").querySelector(".text").innerText
        if (teeSelection === "Select A Tee") {
            return swal("Please Enter a Tee Option!")
        }
        const teeNumber = teeSelection.split(" ")[1]
        const holePar = currentHole[`tee_${teeNumber}_par`]
        const strokeCount = event.target.querySelector("#strokeHoleInput").querySelector(".text").innerText
        if (strokeCount === "Enter Stroke") {
            return swal("Please Enter a Stroke!")
        }
        const strokeParDifference = parseInt(holePar) - parseInt(strokeCount)
        this.setState({ currentUserStanding: this.state.currentUserStanding - strokeParDifference })
        const userHoleInfo = {
            hole: this.state.currentHole,
            stroke: parseInt(strokeCount),
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
        if (this.state.currentHole >= this.state.holes) {
            console.log("Game Completed!!!")
            console.log("Final ScoreCard: ", [...this.state.currentUserScoreScard, userHoleInfo])
            const gameDetails = {
                user: this.state.currentUser,
                finalScoreCard: [...this.state.currentUserScoreScard, userHoleInfo],
                course: this.props.course[0]
            }
            fetch('http://localhost:3000/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gameDetails),
            })
                .then(response => response.json())
                .then(data => {
                    swal({
                        title: "Round Complete!",
                        text: `Final Standing:  ${(this.state.currentUserStanding - strokeParDifference) === 0 ? "Even" : (this.state.currentUserStanding - strokeParDifference)} .You may view the full ScoreCard on your Statistics Page.`,
                        icon: "success",
                        button: "Return Home",
                    });
                })
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
                </div>
            )
        }
        if (this.state.loadingNextHole) {
            return (
                <div >
                    <Dimmer active>
                        <Loader size='massive'>Loading Next Hole</Loader>
                    </Dimmer>
                </div>
            )
        }
        return (
            <div className="welcomeBodyContainer">
                <Header />
                <div className="gameContainer">

                    <CourseDetails
                        course={this.props.course[0]}
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


const mapStateToProps = state => {
    return {
        course: state.courses[0],
        courseImgs: state.courses[1],
        currentUser: state.users
    }
}

export default connect(mapStateToProps)(Game)
