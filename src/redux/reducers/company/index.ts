import {CompanyState} from "../../states/company";
import {CompanyActionTypes} from "../../actions/company";
import {SET_COMPANY} from "../../types/company";
import {companyLocalPersistence} from "../../../localpersistence/company";

const company = companyLocalPersistence.getCompany()

const initialState: CompanyState = {
    company: {
        id: company?.id || "",
        name: company?.name || "",
        taxIdentificationNumber: company?.taxIdentificationNumber || "",
        bankAccountNumber: company?.bankAccountNumber || "",
        taxableFirmAddress: company?.taxableFirmAddress || "",
        taxableFirmName: company?.taxableFirmName || "",
        bankBranch: company?.bankBranch || "",
        bankName: company?.bankName || "",
        address: company?.address || "",
        phone: company?.phone || "",
    }
}

const companyReducer = (state: CompanyState = initialState, action: CompanyActionTypes): CompanyState => {
    switch (action.type) {
        case SET_COMPANY:
            return {...state, company: action.payload}
        default:
            return state
    }
}

export default companyReducer