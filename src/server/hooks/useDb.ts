import {HooksRegistry, HookSymbols} from "./registry.js";
import {MongoDB} from "../config/db/connection.js";

export const useDb = () => {
    const db = HooksRegistry.get(HookSymbols.Database)

    if (db && db instanceof MongoDB) return db
    else throw Error('Mongoose has not been properly initialized.')
}