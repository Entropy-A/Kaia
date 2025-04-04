import { ApiRequest, ApiResponse } from "$/core/types/api.core.dto.js";
import { NextFunction } from "express";
import { ZodSchema } from "zod";

type ValidationSchema = {
    body?: ZodSchema,
    params?: ZodSchema,
    query?: ZodSchema,
}
export const validate = (schema: ValidationSchema) => (request: ApiRequest, response: ApiResponse, next: NextFunction) => {
    try {
        if (schema.body) request.body = schema.body.parse(request.body);
        if (schema.params) request.params = schema.params.parse(request.params);
        if (schema.query) request.query = schema.query.parse(request.query);
        next();
    } catch (error) {
        next(error);
    }
};