export type Success<ReturnType> = {success: true, result: ReturnType}
export type Fail = {success: false, error: unknown}

export type ResultType<ReturnType> = Success<ReturnType> | Fail

export function Success<ReturnType>(data: ReturnType) {
    return { success: true as const, data };
}

export function Fail(error: unknown): Fail {
    return { success: false as const, error };
}