import mongoose from "mongoose";
import {Keys} from "../keys/keys.js";
import {Logger, LoggerOrigin} from "$/server/core/utils/index.js";
import {HooksRegistry, HookSymbols} from "$/server/core/hooks/registry.js";

// Initialization
const connection = await mongoose.connect(Keys.MONGODB_URI);

export const connectDb = () => {
    HooksRegistry.set(HookSymbols.Database, new MongoDB())
    return connection
}

// Database
export class MongoDB {
    public logger = new Logger(LoggerOrigin.DB);
    public mongoose: typeof connection;

    constructor() {
        try {
            this.mongoose = connection;
        } catch (e) {
            this.logger.error(e as string);
            process.exit(1);
        }
    }
}