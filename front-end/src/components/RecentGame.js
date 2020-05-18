import React from "react"
import Moment from 'react-moment';
import { Table } from 'semantic-ui-react'

const RecentGame = (props) => {



    if (props.user !== null) {
        const recentCourse = props.user.dg_courses[(props.user.dg_courses["length"] - 1)]
        const timePlayed = props.user.dg_courses[(props.user.dg_courses["length"] - 1)].created_at
        const gameID = props.user.games[(props.user.games["length"] - 1)].id
        const recentScoreCards = props.user.scorecards.filter(sc => { return sc.game_id === gameID })
        const holeNums = recentScoreCards.map(sc => {
            return sc.holeNum
        })
        return (
            <div>
                <div className="recentGameDisplay">
                    <h1> Most Recent Game</h1>
                    <h2>Course: {recentCourse.name}</h2>
                    <h3>{recentCourse.city}, {recentCourse.state} </h3>
                    <h3>Score: {props.user.games[(props.user.games["length"] - 1)].score}</h3>
                    <h4>Played On: <Moment format="YYYY/MM/DD">{timePlayed}</Moment></h4>
                    <h3>Score Card</h3>
                </div>
                <div className="recentGameTable">
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Hole</Table.HeaderCell>
                                {holeNums.map(hole => {
                                    return <Table.HeaderCell>{hole}</Table.HeaderCell>
                                })}
                            </Table.Row>
                            <Table.Row>
                                <Table.HeaderCell>Par</Table.HeaderCell>
                                {recentScoreCards.map(sc => {
                                    return <Table.HeaderCell>{sc.parCount}</Table.HeaderCell>
                                })}
                            </Table.Row>
                            <Table.Row>
                                <Table.HeaderCell>Stroke</Table.HeaderCell>
                                {recentScoreCards.map(sc => {
                                    return <Table.HeaderCell>{sc.strokeCount}</Table.HeaderCell>
                                })}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                        </Table.Body>
                    </Table>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
}

export default RecentGame