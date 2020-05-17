import React from "react"
import { Dropdown, Button, Form } from "semantic-ui-react"


const Strokes = (props) => {
    const teeOptions = [
        {
            key: "Tee 1",
            text: "Tee 1",
            value: "Tee 1"
        },
        {
            key: "Tee 2",
            text: "Tee 2",
            value: "Tee 2"
        }
    ]
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
            <Form size="tiny">
                <p className="strokeUserHeader">DannyD</p>
                <div className="strokeInputContainer">
                    <Dropdown placeholder='Select A Tee' search selection options={teeOptions} labelPosition='center' fluid />
                    <Dropdown placeholder='Enter Stroke' search selection options={strokeOptions} labelPosition='center' fluid />
                    <Button content='Submit Hole' icon="trophy" labelPosition='center' color='yellow' fluid />
                </div>
            </Form>
        </div>
    )
}

export default Strokes