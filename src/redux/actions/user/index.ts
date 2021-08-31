import {SET_USER_ID, SET_USER_DATA} from "../../types/user";
import {UserData} from "../../../models/UserData";
import {userLocalPersistence} from "../../../localpersistence/user";

interface SetUserId {
    type: typeof SET_USER_ID
    payload: string
}

interface SetUserData {
    type: typeof SET_USER_DATA
    payload: UserData
}

export type UserActionTypes = SetUserId | SetUserData

export const setUserId = (payload: string): UserActionTypes => {

    userLocalPersistence.setUserId(payload)

    return ({type: SET_USER_ID, payload})
}

export const setUserData = (payload: UserData): UserActionTypes => {

    userLocalPersistence.setUserData(payload)

    return ({type: SET_USER_DATA, payload})
}

