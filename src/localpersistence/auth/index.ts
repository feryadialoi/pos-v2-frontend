import {Auth} from "../../models/auth"

const AUTH = "AUTH"
const ACCESS_TOKEN = "ACCESS_TOKEN"
const REFRESH_TOKEN = "REFRESH_TOKEN"

const setAuth = (auth: Auth) => {
    localStorage.setItem(AUTH, JSON.stringify(auth))
}

const getAuth = (): Auth | null => {
    const auth = localStorage.getItem(AUTH)
    if (auth) {
        return JSON.parse(auth)
    }
    return null
}

const removeAuth = () => {
    localStorage.removeItem(AUTH)
}

const setAccessToken = (accessToken: string) => {
    const auth = getAuth()
    if (auth) {
        setAuth({...auth, accessToken})
    }
}

export const authLocalPersistence = ({
    setAuth,
    getAuth,
    removeAuth,
    setAccessToken
})