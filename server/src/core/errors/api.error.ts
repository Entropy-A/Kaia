import { ErrorCodes } from "$/core/utils/status.codes/errors.js";

// TODO: Vielleicht den error type definieren sowie bei Zod ein object generieren mit allen fehlenden feldern
export class ApiError extends Error {
    constructor(
        public statusCode: ErrorCodes,
        message: string,
        public details?: string | object,
        public isCritical = false,
        stack = "",
    ) {
        super(message);
        if (stack) this.stack = stack;
        else Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends ApiError {
    // TODO
    constructor(public details?: Record<string, string>) {
        super(400, "Validation failed");
    }
}

export class NotFoundError extends ApiError {
    constructor(details?: string) {
        super(404, "Not Found", details);
    }
}