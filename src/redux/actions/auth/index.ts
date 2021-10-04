import {authLocalPersistence} from "../../../localpersistence/auth"
import {Auth} from "../../../models/auth"
import {LOGIN, LOGOUT, SET_ACCESS_TOKEN} from "../../types/auth"
import {userLocalPersistence} from "../../../localpersistence/user";
import {companyLocalPersistence} from "../../../localpersistence/company";


interface SetAuth {
    type: typeof LOGIN
    payload: Auth
}

interface RemoveAuth {
    type: typeof LOGOUT
    payload: null
}

interface SetAccessToken {
    type: typeof SET_ACCESS_TOKEN
    payload: string
}

export type AuthActionTypes = SetAuth | RemoveAuth | SetAccessToken

export const handleLogin = (payload: Auth): AuthActionTypes => {
    authLocalPersistence.setAuth(payload)
    return ({type: LOGIN, payload})
}

export const handleLogout = (): AuthActionTypes => {
    authLocalPersistence.removeAuth()
    userLocalPersistence.removeUserId()
    userLocalPersistence.removeUserData()
    companyLocalPersistence.removeCompany()
    return ({type: LOGOUT, payload: null})
}

export const setAccessToken = (payload: string) => {
    authLocalPersistence.setAccessToken(payload)
    return ({type: SET_ACCESS_TOKEN, payload})
}

// ** Handle User Login
// export const handleLogin = data => {
//     return dispatch => {
//         dispatch({
//             type: 'LOGIN',
//             data,
//             config,
//             [config.storageTokenKeyName]: data[config.storageTokenKeyName],
//             [config.storageRefreshTokenKeyName]: data[config.storageRefreshTokenKeyName]
//         })
//
//         // ** Add to user, accessToken & refreshToken to localStorage
//         localStorage.setItem('userData', JSON.stringify(data))
//         localStorage.setItem(config.storageTokenKeyName, JSON.stringify(data.accessToken))
//         localStorage.setItem(config.storageRefreshTokenKeyName, JSON.stringify(data.refreshToken))
//     }
// }


// ** Handle User Logout
// export const handleLogout = () => {
//     return dispatch => {
//         dispatch({type: 'LOGOUT', [config.storageTokenKeyName]: null, [config.storageRefreshTokenKeyName]: null})
//
//         // ** Remove user, accessToken & refreshToken from localStorage
//         localStorage.removeItem('userData')
//         localStorage.removeItem(config.storageTokenKeyName)
//         localStorage.removeItem(config.storageRefreshTokenKeyName)
//     }
// }
