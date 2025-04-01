import { Request } from "express";
import { ApiResponseData } from "$/server/core/types/apiResponse.dto.js";
import * as core from "express-serve-static-core";

export type ApiRequest<req = unknown, res = unknown, params = core.ParamsDictionary, query = core.Query> = Request<params, ApiResponseData<res>, req, query>