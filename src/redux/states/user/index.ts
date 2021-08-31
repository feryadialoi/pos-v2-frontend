import {UserData} from "../../../models/UserData";

export interface UserState {
    userId: string | null
    userData: UserData | null
}