import React from "react"

const CourseDetails = (props) => {
    if (props.coursePics !== undefined) {
        return (
            <div className="courseDetails">
                <h1 id="gameCourseNameHeader">{props.course.name}</h1>
                <div id="gameCoursePictureContainer">
                    <img src={props.coursePics.course_photo_url_medium} alt={props.course.name} id="gameCourseImg"></img>
                    <p id="gameCoursePictureCaption">{props.coursePics.course_photo_caption}</p>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="courseDetails">
                <h1 id="gameCourseNameHeader">{props.course.name}</h1>
                <div id="gameCoursePictureContainer">
                    <img src={require("../images/DGCourseDefault.jpeg")} alt="DefaultCourseImage" id="gameCourseImg"></img>
                    <p id="gameCoursePictureCaption">Hole #6</p>
                </div>
            </div>
        )
    }
}

export default CourseDetails