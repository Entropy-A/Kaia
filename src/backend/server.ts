import express, {NextFunction, Request, Response} from "express"
import {Logger, LoggerOrigin} from "../utils/index.js";
import {connectDb} from "./config/db/index.js";
import {IStatistic} from "./models/index.js";
import statisticRouter from "./routes/statistics.js";
import {Keys} from "../keys/keys.js";
import validator, {body, checkSchema, matchedData, query, validationResult} from "express-validator";
import {IsEmptyOptions} from "express-validator/lib/options.js";

const logger = new Logger(LoggerOrigin.SERVER);
const app = express();

app.use("/statistics", statisticRouter);

app.listen(Keys.PORT, () => {
    logger.log(`Server started at [http://localhost:${Keys.PORT}]`);
    const connection = connectDb();
    logger.log(`MongoDB connected to [${connection.connection.host}]`);
})

// TUTORIAL
app.use(express.json())

export const users = [
    {id: 1, username: "joe", displayName: "Joe"},
    {id: 2, username: "donald", displayName: "Donald"},
    {id: 3, username: "melania", displayName: "Melania"},
    {id: 4, username: "xxanus", displayName: "Nibba"},
    {id: 5, username: "anton", displayName: "Anton"},
    {id: 6, username: "moloch", displayName: "Satan"},

]

app.get("/", (req, res, next) => {
    console.log("base url");
    next();
}, (req, res) => {
    res.send("Hello World!")
});

// Validation, with message after every check -> corrensponding message

import usersRouter from "./routes/tutorial.js"
import {resolveUserIndexByID} from "../utils/middleware.js";

app.use(usersRouter); //ROUTER using