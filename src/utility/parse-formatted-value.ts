export const parseFormattedValue = (value: string) => {
    return value
        .replace(".", "")
        .replace(",", ".")
}

export const parseValueToFormatted = (value: string) => {
    return value.replace(".", ",")
}