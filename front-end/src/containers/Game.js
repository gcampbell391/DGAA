import React from "react"
import { connect } from "react-redux"
import { Dimmer, Loader, Image } from 'semantic-ui-react'
import Header from "./Header"
import Footer from "../components/Footer";
import ScoreCard from "../components/ScoreCard";
import CourseDetails from "../components/CourseDetails";
import HoleDetails from "../components/HoleDetails";

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            course: null,
            holes: null,
            coursePics: null,
            loading: true,
            currentHole: 1
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
        return (
            <div className="welcomeBodyContainer">
                <Header />
                <div className="gameContainer">
                    <CourseDetails course={this.state.course[0]} />
                    <HoleDetails hole={this.state.course[this.state.currentHole]} />
                </div>
                <ScoreCard />
                <Footer />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        course: state.courses[0],
        courseImgs: state.courses[1]
    }
}

export default connect(mapStateToProps)(Game)
