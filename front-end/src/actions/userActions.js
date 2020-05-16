export const userLogin = user => {
    return (dispatch) => {
        dispatch({
            type: "USER_LOGIN",
            user
        })
    }
}

export const userLogout = user => {
    return (dispatch) => {
        dispatch({
            type: "USER_LOGOUT",
            user
        })
    }
}

export const userUpdate = user => {
    return (dispatch => {
        dispatch({
            type: "USER_UPDATE",
            user
        })
    })
}

export const userSignUp = user => {
    return (dispatch => {
        dispatch({
            type: "USER_SIGNUP",
            user
        })
    })
}
