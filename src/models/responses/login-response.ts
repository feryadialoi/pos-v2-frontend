import {UserData} from "../user-data";

export interface LoginResponse {
    userId: number
    user: UserData
    accessToken: string
    refreshToken: string
}