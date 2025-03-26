import {Logger, LoggerOrigin} from "../utils/index.js";
import {connectDb} from "./config/db/connection.js";
import {Keys} from "./config/index.js";
import app from "./app.js";

// Better error catching.
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

const logger = new Logger(LoggerOrigin.SERVER);

app.listen(Keys.PORT, () => {
    logger.log(`Server started at [http://localhost:${Keys.PORT}]`);
    const connection = connectDb();
    logger.log(`MongoDB connected to [${connection.connection.host}]`);
})