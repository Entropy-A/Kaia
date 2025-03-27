import {ApiResponse} from "$/server/core/types/apiResponse.dto.js";

export interface ApiErrorResponse extends ApiResponse {
    error: {
        message: string
        details?: string
    }
}