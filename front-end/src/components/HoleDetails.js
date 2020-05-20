import React from "react"
import Strokes from "./Strokes"

const HoleDetails = (props) => {
    if (props.hole) {
        return (
            <div className="holeDetails">
                <h1 className="holeContainerHeader">Hole {props.hole.hole_num}</h1>
                <div className="teeParContainer">
                    <div className="tee1Container">
                        <h1 className="teeHeader">Tee 1</h1>
                        <p>Length: {props.hole.tee_1_len}</p>
                        <p>Par: {props.hole.tee_1_par}</p>
                    </div>
                    <div className="tee2Container">
                        <h1 className="teeHeader">Tee 2</h1>
                        <p>Length: {props.hole.tee_2_len}</p>
                        <p>Par: {props.hole.tee_2_par}</p>
                    </div>
                </div>
                <Strokes
                    handleSubmitHoleBtn={props.handleSubmitHoleBtn}
                    currentUserStanding={props.currentUserStanding}
                />
            </div>
        )
    }
    else {
        setTimeout(() => {
            return (
                <div className="holeDetails">
                    <h1 className="holeContainerHeader">Hole {props.hole.hole_num}</h1>
                    <div className="teeParContainer">
                        <div className="tee1Container">
                            <h1 className="teeHeader">Tee 1</h1>
                            <p>Length: {props.hole.tee_1_len}</p>
                            <p>Par: {props.hole.tee_1_par}</p>
                        </div>
                        <div className="tee2Container">
                            <h1 className="teeHeader">Tee 2</h1>
                            <p>Length: {props.hole.tee_2_len}</p>
                            <p>Par: {props.hole.tee_2_par}</p>
                        </div>
                    </div>
                    <Strokes
                        handleSubmitHoleBtn={props.handleSubmitHoleBtn}
                        currentUserStanding={props.currentUserStanding}
                    />
                </div>
            )
        }, 2000);
    }


}

export default HoleDetails