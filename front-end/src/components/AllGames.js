import React from "react"
import { Button } from "semantic-ui-react"

const AllGames = (props) => {
    return (
        <div className="AllGameDisplay">
            <h1>Games Played: {props.user[0].games_played}</h1>
            <h1>Holes Played: {props.user[0].holes_played}</h1>
            <h2>Average Score Per Round: {props.user[0].avg_score}</h2>
            <h3>Average Stroke Per Hole: {props.user[0].avg_stroke}</h3>
            <h3>Average Score Per Hole: {props.user[0].avg_diff === 0 ? "EVEN" : props.user[0].avg_diff}</h3>
            <div className="AllGameDisplayBtn">
                <Button color="green" onClick={props.HandleAllGamesBtnClick}>View All Game Results</Button>
            </div>
        </div>
    )
}

export default AllGames