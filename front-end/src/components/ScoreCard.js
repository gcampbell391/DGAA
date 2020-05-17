import React from "react"
import { Card } from 'semantic-ui-react'

const ScoreCard = (props) => {
    const items = [
        {
            header: "DannyD",
            description: "Hole 1",
            meta: "Strokes: 4",
        },
        {
            header: "DannyD",
            description: "Hole 2",
            meta: "Strokes: 2",
        },
        {
            header: "DannyD",
            description: "Hole 3",
            meta: "Strokes: 6",
        },
    ]
    return (
        <div className="scoreCard">
            <h1 className="scoreCardHeader">ScoreCard</h1>
            <Card.Group items={items} itemsPerRow={9} />
        </div>
    )
}

export default ScoreCard