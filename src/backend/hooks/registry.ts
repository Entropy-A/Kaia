export const HooksRegistry = new Map<symbol, unknown>();
export const HookSymbols = {
    Database: Symbol('Database'),
} as const;