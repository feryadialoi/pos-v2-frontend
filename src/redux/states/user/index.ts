import {UserData} from "../../../models/user-data";

export interface UserState {
    userId: string | null
    userData: UserData | null
}