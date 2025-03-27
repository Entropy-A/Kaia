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
        message: string,
        public details?: string,
        public isCritical = false,
        stack = ""
    ) {
        super(message);
        if (stack) this.stack = stack;
        else Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends ApiError {
    constructor(details?: string) {
        super(400, "Validation failed", details);
    }
}