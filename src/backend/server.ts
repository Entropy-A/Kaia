import express from "express"
import {Logger, LoggerOrigin} from "./utils/log";

const logger = new Logger(LoggerOrigin.SERVER);
const app = express();

app.listen(5000, () => {
    logger.log("Server started at http://localhost:5000");
})