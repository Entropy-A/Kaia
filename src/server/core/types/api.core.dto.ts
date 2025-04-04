import { Request } from "express";
import * as core from "express-serve-static-core";
import { Response } from "express";
import { ErrorResponse } from "$/server/core/errors/index.js";

// Request
export type ApiRequest<req = unknown, res = unknown, params = core.ParamsDictionary, query = core.Query> = Request<params, ApiResponseData<res>, req, query>

// Response
type ApiResponseData<res = null> = |
    {
        success: true;
        data: res;
        message?: string;
    } |
    {
        success: true;
        delete: true,
        data: res;
        message?: string;
    } |
    {
        success: false;
        error: ErrorResponse;
    }
export type ApiResponse<T = undefined> = Response<ApiResponseData<T>>