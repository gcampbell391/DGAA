import React from "react"
import { Card } from 'semantic-ui-react'

const ScoreCard = (props) => {

    const userScores = props.currentUserScoreScard.map(score => {
        return {
            header: `Hole: ${score.hole}`,
            description: `Strokes: ${score.stroke}`,
            meta: `Par: ${score.par}`
        }
    })
    return (
        <div className="scoreCard">
            <h1 className="scoreCardHeader">ScoreCard</h1>
            <Card.Group items={userScores} itemsPerRow={9} />
        </div>
    )
}

export default ScoreCard