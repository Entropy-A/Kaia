import mongoose from "mongoose";
import { Keys } from "../keys/keys.js";
import { Logger, LoggerOrigin } from "$/server/core/utils/index.js";
import { HooksRegistry, HookSymbols } from "$/server/core/hooks/registry.js";

export abstract class MongoHook {
    protected constructor(public logger: Logger, public db: typeof mongoose) {}
}

// Only for initializing the Hook.
class MongoHookInit extends MongoHook {
    constructor(logger: Logger, db: typeof mongoose) { super(logger, db); }
}

async function connectDb() {
    const logger = new Logger(LoggerOrigin.DB);
    try {
        const db = await mongoose.connect(Keys.MONGODB_URI);
        const { connection } = db;
        HooksRegistry.set(HookSymbols.Mongo, new MongoHookInit(logger, db));
        logger.info(`MongoDB connected to [${connection.host}:${connection.port}]`);
    } catch (error) {
        logger.location("Connection").error(error);
        process.exit(1);
    }
}

export default connectDb;