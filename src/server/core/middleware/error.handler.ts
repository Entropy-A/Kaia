import { Response, Request, NextFunction } from "express";
import { ApiError, ValidationError } from "$/server/core/errors/api.error.js";
import { Error, MongooseError } from "mongoose";
import { ZodError } from "zod";
import { ApiLogger } from "$/server/app.js";
import { ApiErrorResponse } from "$/server/core/errors/errorResponse.dto.js";
import { ApiResponse } from "$/server/core/types/apiResponse.dto.js";
import { ApiRequest } from "$/server/core/types/apiRequest.dto.js";
export const errorHandler = (
    err: unknown,
    req: ApiRequest,
    res: ApiResponse<undefined>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
) => {

    let error: ApiError;

    switch (true) {

    case err instanceof ApiError:
        error = err;
        break;

    case err instanceof ZodError:
        error = new ValidationError(err.errors.map(e => `${e.path.join("/")}: ${e.message}`).join("\n"));
        break;

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
    ApiLogger.location(req.path, req.method).error(
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