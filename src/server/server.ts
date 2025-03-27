import connectDb from "./config/db/connection.js";
import {Keys} from "./config/index.js";
import app, {ApiLogger} from "./app.js";

process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
    ApiLogger.error(`Unhandled Rejection at: ${promise}, reason: ${reason.message}`);
    // Consider restarting the process in production
});

process.on('uncaughtException', (error: Error) => {
    ApiLogger.error(`Uncaught Exception: ${error.message}`);
    // Consider restarting the process in production
});

app.listen(Keys.PORT, async () => {
    await connectDb();
    ApiLogger.log(`Server started at [http://localhost:${Keys.PORT}]`);
})