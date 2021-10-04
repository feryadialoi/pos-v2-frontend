import {UserData} from "../UserData";
import {Company} from "../Company";

export interface LoginResponse {
    userId: string
    user: UserData
    company: Company
    accessToken: string
    refreshToken: string
}