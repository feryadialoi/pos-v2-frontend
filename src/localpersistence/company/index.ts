import {Company} from "../../models/Company";

const COMPANY = "COMPANY"


const setCompany = (company: Company) => {
    localStorage.setItem(COMPANY, JSON.stringify(company))
}

const getCompany = (): Company | null => {
    const company = localStorage.getItem(COMPANY)
    if (!company) return null
    return JSON.parse(company) as Company
}

const removeCompany = () => {
    localStorage.removeItem(COMPANY)
}

export const companyLocalPersistence = {
    setCompany, getCompany, removeCompany
}