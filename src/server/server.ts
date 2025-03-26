import {connectDb} from "./config/db/connection.js";
import {Keys} from "./config/index.js";
import app, {ApiLogger} from "./app.js";

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
    ApiLogger.error(`Unhandled Rejection at: ${promise}, reason: ${reason.message}`);
    // Consider restarting the process in production
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
    ApiLogger.error(`Uncaught Exception: ${error.message}`);
    // Consider restarting the process in production
});

app.listen(Keys.PORT, () => {
    ApiLogger.log(`Server started at [http://localhost:${Keys.PORT}]`);
    const connection = connectDb();
    ApiLogger.log(`MongoDB connected to [${connection.connection.host}]`);
})