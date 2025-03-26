import {Response, Request, NextFunction} from "express";
import ApiError from "$/utils/errors/apiError.js";
import {MongooseError} from "mongoose";

interface ErrorResponse {
    statusCode: number;
    message: string;
    stack: string;
}

export const errorHandler = (
    err: Error | ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    let error: ApiError;

    if (!(err instanceof ApiError)) {
        // TODO: More statusCodes
        const statusCode =
            err instanceof MongooseError && err.name === "ValidationError" ? 400
            : 500;

        const message = err.message ?? "Internal Server Error";

        error = new ApiError(statusCode, message, true, err.stack);
    } else {
        error = err;
    }

    res.status(error.statusCode).json({
        error: {
            message: error.message,
        },
    })
}