import express from "express"
import {Logger, LoggerOrigin} from "../utils/index.js";
import {connectDb} from "./config/db/index.js";
import statisticRouter from "./routes/statistics.routes.js";
import {Keys} from "./config/index.js";

const logger = new Logger(LoggerOrigin.SERVER);
const app = express();

app.use("/statistics", statisticRouter);

app.listen(Keys.PORT, () => {
    logger.log(`Server started at [http://localhost:${Keys.PORT}]`);
    const connection = connectDb();
    logger.log(`MongoDB connected to [${connection.connection.host}]`);
})