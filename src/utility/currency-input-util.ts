export const sanitizeCurrencyInput = (value, onChange) => {

    if (value && value.toLowerCase() == "0k") {

    } else if (value && value.toLowerCase() == "0m") {

    } else if (value && value.toLowerCase() == "0b") {

    } else {
        onChange(value == undefined ? "0" : value)
    }
}