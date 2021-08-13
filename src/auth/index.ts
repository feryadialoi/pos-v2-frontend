import {authLocalPersistence} from "../localpersistence/auth"

export const getHomeRouteForLoggedInUser = (userRole: string) => {
    if (userRole === 'admin') return '/'
    if (userRole === 'client') return {name: 'access-control'}
    return {name: 'auth-login'}
}

export const isUserLoggedIn = (): boolean => {
    return !!authLocalPersistence.getAuth()?.refreshToken && !!authLocalPersistence.getAuth()?.refreshToken
}
