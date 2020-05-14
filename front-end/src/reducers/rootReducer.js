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
            return state
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