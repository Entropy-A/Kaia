import { Response } from "express";
import { ApiErrorResponse } from "$/server/core/errors/index.js";

export type ApiResponse<T = undefined> = Response<ApiResponseData<T>>

export interface ApiResponseData<T> {
    success: boolean;
    data?: T
    message?: string;
    error?: ApiErrorResponse;
}