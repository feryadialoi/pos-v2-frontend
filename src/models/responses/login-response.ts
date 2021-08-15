import {UserData} from "../user-data";

export interface LoginResponse {
    userId: string
    user: UserData
    accessToken: string
    refreshToken: string
}