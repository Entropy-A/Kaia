export type ExtractParams<Path extends string> =
    Path extends `${string}:${infer Param}/${infer Rest}`
        ? { [K in Param | keyof ExtractParams<`/${Rest}`>]: string }
        : Path extends `${string}:${infer Param}`
            ? { [K in Param]: string }
            : object;