import {UserState} from "../../states/user";
import {UserActionTypes} from "../../actions/user";
import {SET_USER_ID, SET_USER_DATA} from "../../types/user";
import {userLocalPersistence} from "../../../localpersistence/user";

const initialState: UserState = {
    userId: userLocalPersistence.getUserId(),
    userData: userLocalPersistence.getUserData()
}

const userReducer = (state = initialState, action: UserActionTypes): UserState => {
    switch (action.type) {
        case SET_USER_ID:
            return {...state, userId: action.payload}
        case SET_USER_DATA:
            return {...state, userData: action.payload}
        default:
            return state
    }
}

export default userReducer