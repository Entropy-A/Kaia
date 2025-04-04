import { NextFunction } from "express";
import { ApiError, ValidationError } from "$/core/errors/api.error.js";
import { Error, MongooseError } from "mongoose";
import { ZodError } from "zod";
import { ApiLogger } from "$/app.js";
import { ErrorResponse } from "$/core/errors/error.dto.js";
import { ApiRequest, ApiResponse } from "$/core/types/index.js";
export const errorHandler = (
    err: unknown,
    req: ApiRequest,
    res: ApiResponse<ErrorResponse>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
) => {

    let error: ApiError;

    switch (true) {

    case err instanceof ApiError:
        error = err;
        break;

    case err instanceof ZodError:
        error = new ValidationError(Object.fromEntries(err.errors.map(e => [e.path, e.message])));
        break;

        // TODO
        // case err instanceof MongooseError:
        //     break;

    default:
        try {
            error = new ApiError(500, "Internal Server Error", (err as Error).message, true, (err as Error).stack);
            break;
        } catch {
            error = new ApiError(500, "Internal Server Error", "Unknown source", true);
            break;
        }
    }

    const { statusCode, message, details } = error;
    ApiLogger.location(req.method, req.path).error(
        statusCode,
        message,
        details,
    );

    res.status(statusCode).json({
        success: false,
        error: {
            message,
            ...(details && { details }),
        },
    });
};