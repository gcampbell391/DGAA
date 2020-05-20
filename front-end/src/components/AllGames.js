import React from "react"

const AllGames = (props) => {
    return (
        <div className="AllGameDisplay">
            <h1>Games Played: {props.user[0].games_played}</h1>
            <h1>Holes Played: {props.user[0].holes_played}</h1>
            <h2>Average Score Per Round: {props.user[0].avg_score}</h2>
            <h3>Average Stroke Per Hole: {props.user[0].avg_stroke}</h3>
            <h3>Average Difference Per Hole: {props.user[0].avg_diff}</h3>
        </div>
    )
}

export default AllGames