import mongoose from "mongoose";
import {Keys} from "../keys/keys.js";
import {Logger, LoggerOrigin} from "$/server/core/utils/index.js";
import {HooksRegistry, HookSymbols} from "$/server/core/hooks/registry.js";

async function connectDb() {
    const logger = new Logger(LoggerOrigin.DB);
    try {
        const db = await mongoose.connect(Keys.MONGODB_URI);
        const {connection} = db;
        HooksRegistry.set(HookSymbols.Database, {db, logger});
        logger.info(`MongoDB connected to [${connection.host}:${connection.port}]`);
    } catch (error) {
        logger.location("Connection").error(error);
        process.exit(1);
    }
}

export default connectDb;