import express from "express"
import {Logger, LoggerOrigin} from "../utils/index.js";
import {connectDb} from "./config/db/index.js";
import {Keys} from "../keys/keys.js";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser"

const logger = new Logger(LoggerOrigin.SERVER);
const app = express();

app.listen(Keys.PORT, () => {
    logger.log(`Server started at [http://localhost:${Keys.PORT}]`);
    const connection = connectDb();
    logger.log(`MongoDB connected to [${connection.connection.host}]`);
})

// TUTORIAL
app.use(express.json())
app.use(cookieParser())
app.use("/api", routes)

export const users = [
    {id: 1, username: "joe", displayName: "Joe"},
    {id: 2, username: "donald", displayName: "Donald"},
    {id: 3, username: "melania", displayName: "Melania"},
    {id: 4, username: "xxanus", displayName: "Nibba"},
    {id: 5, username: "anton", displayName: "Anton"},
    {id: 6, username: "moloch", displayName: "Satan"},
]