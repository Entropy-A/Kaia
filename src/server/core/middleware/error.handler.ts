import {Response, Request, NextFunction} from "express";
import {ApiError, ValidationError} from "$/server/core/errors/api.error.js";
import {Error, MongooseError} from "mongoose";
import {ZodError} from "zod";
import {ApiLogger} from "$/server/app.js";
import {ApiErrorResponse} from "$/server/types/error.type.js";
export const errorHandler = (
    err: Error | ApiError,
    req: Request,
    res: Response<ApiErrorResponse>,
    next: NextFunction
) => {

    let error: ApiError;

    switch (true) {
        case err instanceof ApiError:
            error = err
            break

        case err instanceof ZodError:
            error = new ValidationError(err.errors.map(e => `${e.path.join("/")}: ${e.message}`).join("\n"));
            break;

        default:
            error = new ApiError(500, "Internal Server Error", undefined, true, err.stack);
            break;
    }

    ApiLogger.location(req.method, req.path).error(error)
    const {statusCode, message, details} = error;

    res.status(statusCode).json({
        error: {
            message,
            ...(details && {details}),
        },
    })
}