/**
 * return date string format: 2020-12-31
 * @param date
 */

export const formatDateToCommonFormat = (date: Date) => {

    const formatted = new Intl.DateTimeFormat("in-ID").format(date)

    const dateValue = date.getDate().toString().padStart(2, "0")
    const monthValue = (date.getMonth() + 1).toString().padStart(2, "0")
    const yearValue = date.getFullYear()

    return yearValue + "-" + monthValue + "-" + dateValue
}

export const dateOfDayMonthYear = (date: Date) => {
    if (date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
    }
    date = new Date()
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
}

export const formatDateToReadableDate = (date) => {
    return new Intl.DateTimeFormat("in-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date(date))
}