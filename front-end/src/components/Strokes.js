import React from "react"
import { Dropdown, Button, Form } from "semantic-ui-react"


const Strokes = (props) => {
    console.log(props.hole)
    let teeOptions = []
    if (props.hole.tee_1_len > 0) {
        teeOptions.push({
            key: "Tee 1",
            text: "Tee 1",
            value: "Tee 1"
        })
    }
    if (props.hole.tee_2_len > 0) {
        teeOptions.push({
            key: "Tee 2",
            text: "Tee 2",
            value: "Tee 2"
        })
    }
    if (props.hole.tee_3_len > 0) {
        teeOptions.push({
            key: "Tee 3",
            text: "Tee 3",
            value: "Tee 3"
        })
    }

    const strokeOptions = [
        {
            key: "Stroke 1",
            text: "1",
            value: "Stroke 1"
        },
        {
            key: "Stroke 2",
            text: "2",
            value: "Stroke 2"
        },
        {
            key: "Stroke 3",
            text: "3",
            value: "Stroke 3"
        },
        {
            key: "Stroke 4",
            text: "4",
            value: "Stroke 4"
        },
        {
            key: "Stroke 5",
            text: "5",
            value: "Stroke 5"
        },
        {
            key: "Stroke 6",
            text: "6",
            value: "Stroke 6"
        },
        {
            key: "Stroke 7",
            text: "7",
            value: "Stroke 7"
        },
        {
            key: "Stroke 8",
            text: "8",
            value: "Stroke 8"
        }
    ]
    return (

        <div className="strokesContainer" >
            <Form size="tiny" onSubmit={(event) => props.handleSubmitHoleBtn(event)}>
                <p className="strokeUserHeader">DannyD</p>
                <p className="strokeStandingHeader">Current Standing: {props.currentUserStanding === 0 ? "Even" : props.currentUserStanding}</p>
                <div className="strokeInputContainer">
                    <Dropdown placeholder='Select A Tee' search selection options={teeOptions} labelPosition='center' fluid id="teeHoleInput" />
                    <Dropdown placeholder='Enter Stroke' search selection options={strokeOptions} labelPosition='center' fluid id="strokeHoleInput" />
                    <Button content='Submit Hole' icon="trophy" labelPosition='center' color='yellow' fluid />
                </div>
            </Form>
        </div>
    )
}

export default Strokes