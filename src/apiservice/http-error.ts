export class HttpError<T = any> extends Error {
    private readonly status: number
    private readonly response: T

    constructor(message: string, status: number, response: T) {
        super(message);
        this.status = status
        this.response = response
    }

    getStatus = () => {
        return this.status
    }

    getResponse = () => {
        return this.response
    }
}

export class HttpBadRequestError<T = any> extends HttpError {
    constructor(message: string, response: T) {
        super(message, 400, response);
    }
}


export class HttpUnauthorizedError<T = any> extends HttpError {
    constructor(message: string, response: T) {
        super(message, 401, response);
    }
}

export class AccessTokenExpiredException extends HttpUnauthorizedError {
}

export class LoginFailedException extends HttpUnauthorizedError {
}

export class RefreshTokenExpiredException extends HttpUnauthorizedError {
}

export class HttpForbiddenError<T = any> extends HttpError {
    constructor(message: string, response: T) {
        super(message, 403, response);
    }
}

export class HttpNotFoundError<T = any> extends HttpError {
    constructor(message: string, response: T) {
        super(message, 404, response);
    }
}


export class HttpUnprocessableEntityError<T = any> extends HttpError {
    constructor(message: string, response: T) {
        super(message, 422, response);
    }
}

export class HttpInternalServerErrorError<T = any> extends HttpError {
    constructor(message: string, response: T) {
        super(message, 500, response);
    }
}

export type UnauthenticateErrorType =
    | "UsernameNotFoundException"
    | "BadCredentialsException"
    | "TokenExpiredException"
    | "RefreshTokenExpiredException"
