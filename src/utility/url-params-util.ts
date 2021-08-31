export const urlParamsParser = <T = { [key: string]: string }, >(search: string): T => {
    return search.replace("?", "")
        .split("&")
        .map(item => item.split("="))
        .reduce((acc, cur) => {
            acc[cur[0]] = cur[1]
            return acc
        }, {}) as T
}