import express, {NextFunction, Request, Response} from "express"
import {Logger, LoggerOrigin} from "../utils/index.js";
import {connectDb} from "./config/db/index.js";
import {IStatistic} from "./models/index.js";
import statisticRouter from "./routes/statistics.js";

const logger = new Logger(LoggerOrigin.SERVER);
const app = express();
const PORT = 5000

app.use("/statistics", statisticRouter);

app.listen(PORT, () => {
    logger.log(`Server started at [http://localhost:${PORT}]`);
    const connection = connectDb();
    logger.log(`MongoDB connected to [${connection.connection.host}]`);
})