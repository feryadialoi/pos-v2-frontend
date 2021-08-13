import {UserData} from "../../models/user-data";

const USER_ID = "USER_ID"

const USER_DATA = "USER_DATA"


const setUserId = (userId: number) => {
    localStorage.setItem(USER_ID, userId.toString())
}

const getUserId = (): number | null => {
    const userId = localStorage.getItem(USER_ID)
    if (userId) {
        return +userId
    } else {
        return null
    }
}

const removeUserId = () => {
    localStorage.removeItem(USER_ID)
}

const setUserData = (userData: UserData) => {
    localStorage.setItem(USER_DATA, JSON.stringify(userData))
}

const getUserData = (): UserData | null => {
    const user = localStorage.getItem(USER_DATA)
    if (!!user) {
        return JSON.parse(user) as UserData
    } else {
        return null
    }
}

const removeUserData = () => {
    localStorage.removeItem(USER_DATA)
}

export const userLocalPersistence = {
    setUserId, getUserId, removeUserId,
    setUserData: setUserData, getUserData: getUserData, removeUserData: removeUserData
}

