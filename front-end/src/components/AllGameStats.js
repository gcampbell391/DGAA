import React from 'react'
import { Button, Header, Table, Modal } from 'semantic-ui-react'

const AllGameStats = (props) => (
    <Modal open={props.renderAllGames}>
        {console.log(props)}
        <Modal.Header>All Game Statistics</Modal.Header>
        <Modal.Content image>
            <Modal.Description>
                <Header>Game {props.gameID}:  {props.currentCourseName}</Header>
                <div className="recentGameTable">
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Hole</Table.HeaderCell>
                                {props.scorecards.map(sc => {
                                    return <Table.HeaderCell>{sc.holeNum}</Table.HeaderCell>
                                })}
                            </Table.Row>
                            <Table.Row>
                                <Table.HeaderCell>Par</Table.HeaderCell>
                                {props.scorecards.map(sc => {
                                    return <Table.HeaderCell>{sc.parCount}</Table.HeaderCell>
                                })}
                            </Table.Row>
                            <Table.Row>
                                <Table.HeaderCell>Stroke</Table.HeaderCell>
                                {props.scorecards.map(sc => {
                                    return <Table.HeaderCell>{sc.strokeCount}</Table.HeaderCell>
                                })}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                        </Table.Body>
                    </Table>
                </div>
                {props.gameID === 1 ? null : <Button onClick={props.handlePreviousGameResults} color="yellow">Previous</Button>}
                {props.gameID === props.games.length ? null : <Button onClick={props.handleNextGameResults} color="yellow">Next</Button>}
                <Button onClick={props.handleAllGameCloseBtn} color="red">Close</Button>
            </Modal.Description>
        </Modal.Content>
    </Modal>
)

export default AllGameStats