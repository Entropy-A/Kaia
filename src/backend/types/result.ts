export type Success<ReturnType> = {success: true, result: ReturnType}
export type Failure = {success: false, error: unknown}

export type Result<ReturnType> = Success<ReturnType> | Failure

export function success<ReturnType>(result: ReturnType) {
    return {success: true as const, result};
}

export function fail(error: unknown): Failure {
    return {success: false as const, error};
}