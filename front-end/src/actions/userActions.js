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
