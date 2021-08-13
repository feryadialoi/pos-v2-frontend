import {UserData} from "../../../models/user-data";

export interface UserState {
    userId: number | null
    userData: UserData | null
}