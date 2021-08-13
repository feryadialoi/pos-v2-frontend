export interface ApiResponse<T, E> {
    message: string
    data: T
    error: E
}