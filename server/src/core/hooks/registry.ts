export const HooksRegistry = new Map<symbol, unknown>();
export const HookSymbols = {
    Mongo: Symbol("Mongo"),
} as const;