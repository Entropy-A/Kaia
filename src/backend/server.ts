import express from "express"
import {Logger, LoggerOrigin} from "../utils/log.js";
import {HooksRegistry, HookSymbols} from "./hooks/registry.js";
import {connectDb} from "./config/db/index.js";

const logger = new Logger(LoggerOrigin.SERVER);
const app = express();

app.get("/statistics", (req: express.Request, res: express.Response) => {
    res.send("Server is ready!");
})

app.listen(5000, () => {
    HooksRegistry.set(HookSymbols.Database, connectDb())
    logger.log("Server started at http://localhost:5000");
})