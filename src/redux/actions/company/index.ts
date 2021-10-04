import {SET_COMPANY} from "../../types/company";
import {Company} from "../../../models/Company";
import {companyLocalPersistence} from "../../../localpersistence/company";

interface SetCompany {
    type: typeof SET_COMPANY
    payload: Company
}

export type CompanyActionTypes = SetCompany

export const setCompany = (payload: Company): CompanyActionTypes => {

    companyLocalPersistence.setCompany(payload)

    return ({
        type: SET_COMPANY, payload
    })
}