import {AuthActionTypes} from "../../actions/auth"
import {AuthState} from "../../states/auth"
import {LOGIN, LOGOUT, SET_ACCESS_TOKEN} from "../../types/auth"
import {authLocalPersistence} from "../../../localpersistence/auth";

// **  Initial State
const initialState: AuthState = {
    auth: authLocalPersistence.getAuth()
}

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case LOGIN:
            return {...state, auth: action.payload}
        case LOGOUT:
            return {...state, auth: action.payload}
        case SET_ACCESS_TOKEN:
            return {...state, auth: {...state.auth!, accessToken: action.payload}}
        default:
            return state
    }
}

export default authReducer
