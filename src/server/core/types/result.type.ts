export type Success<ReturnType> = {success: true, result: ReturnType}
export type Failure = {success: false, error: unknown}

export type ResultType<ReturnType> = Success<ReturnType> | Failure

export function success<ReturnType>(data: ReturnType) {
    return {success: true as const, result: data};
}

export function fail(error: unknown): Failure {
    return {success: false as const, error};
}