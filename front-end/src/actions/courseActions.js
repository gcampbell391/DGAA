export const addCourseDetails = course => {
    return (dispatch) => {
        dispatch({
            type: "ADD_COURSE_DETAILS",
            course
        })
    }
}

export const addCoursePictures = course => {
    return (dispatch) => {
        dispatch({
            type: "ADD_COURSE_PICTURES",
            course
        })
    }
}