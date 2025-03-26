enum ErrorCodes {
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500,
}

export default class ApiError extends Error {
    constructor(
        public statusCode: ErrorCodes,
        message: string,
        public isCritical = false,
        stack = ""
    ) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        if (stack) this.stack = stack;
        else Error.captureStackTrace(this, this.constructor);
    }
}