enum ErrorCodes {
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500,
}

export class ApiError extends Error {
    constructor(
        public statusCode: ErrorCodes,
        public message: string,
        public details?: string,
        public isCritical = false,
        public stack = ""
    ) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        if (stack) this.stack = stack;
        else Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends ApiError {
    constructor(details?: string) {
        super(400, "Validation failed", details);
    }
}