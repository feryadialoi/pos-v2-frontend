import {UserData} from "../UserData";

export interface LoginResponse {
    userId: string
    user: UserData
    accessToken: string
    refreshToken: string
}