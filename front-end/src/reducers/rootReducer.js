import { combineReducers } from "redux"

const rootReducer = combineReducers({
    users: usersReducer,
    courses: coursesReducer
});

export default rootReducer;

function usersReducer(state = [], action) {
    switch (action.type) {
        case "USER_LOGIN":
            console.log("Reducer:", action.user)
            return [...state, action.user.user]
        case "USER_LOGOUT":
            state = []
            return state
        case "USER_UPDATE":
            return [action.user]
        case "USER_SIGNUP":
            debugger
            return [action.user]
        default:
            return state;
    }
}

function coursesReducer(state = [], action) {
    switch (action.type) {
        default:
            return state
    }
}