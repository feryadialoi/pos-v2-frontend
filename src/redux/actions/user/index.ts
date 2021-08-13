import {SET_USER_ID, SET_USER_DATA} from "../../types/user";
import {UserData} from "../../../models/user-data";
import {userLocalPersistence} from "../../../localpersistence/user";

interface SetUserId {
    type: typeof SET_USER_ID
    payload: number
}

interface SetUserData {
    type: typeof SET_USER_DATA
    payload: UserData
}

export type UserActionTypes = SetUserId | SetUserData

export const setUserId = (payload: number): UserActionTypes => {

    userLocalPersistence.setUserId(payload)

    return ({type: SET_USER_ID, payload})
}

export const setUserData = (payload: UserData): UserActionTypes => {

    userLocalPersistence.setUserData(payload)

    return ({type: SET_USER_DATA, payload})
}

