import { HooksRegistry, HookSymbols } from "./registry.js";
import { MongoHook } from "$/config/index.js";

export const useDb = () => {
    const hook = HooksRegistry.get(HookSymbols.Mongo);

    if (hook && hook instanceof MongoHook) return hook;
    else throw Error("Mongoose has not been properly initialized.");
};