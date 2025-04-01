import connectDb from "./config/db/connection.js";
import { Keys } from "./config/index.js";
import app, { ApiLogger } from "./app.js";

process.on("unhandledRejection", (reason: Error, promise: Promise<unknown>) => {
    ApiLogger.error(`Unhandled Rejection at: ${promise}, reason: ${reason.message}`);
});

process.on("uncaughtException", (error: Error) => {
    ApiLogger.error(`Uncaught Exception: ${error.message}`);
});

app.listen(Keys.PORT, async () => {
    await connectDb();
    ApiLogger.info(`Server started at [http://localhost:${Keys.PORT}]`);
});