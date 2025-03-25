import express from "express"
import {Logger, LoggerOrigin} from "./utils/index.js";
import {connectDb} from "./config/db/index.js";
import {Keys} from "./config/keys/keys.js";
import routes from "./routes/index.routes.js";

import cookieParser from "cookie-parser"
import session from "express-session"
import passport from "passport"

import "./strategies/local.strategy.js";

const logger = new Logger(LoggerOrigin.SERVER);
// Diese reihenfolge ist wichtig
const app = express();
app.use(express.json())
app.use(cookieParser("secret"))
app.use(session(
    {
        secret: Keys.sessionSecret,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60 * 60 * 1000,
        }
    }
))
app.use(passport.initialize())
app.use(passport.session())

app.use("/api", routes)

app.listen(Keys.PORT, () => {
    logger.log(`Server started at [http://localhost:${Keys.PORT}]`);
    const connection = connectDb();
    logger.log(`MongoDB connected to [${connection.connection.host}]`);
})

export const users = [
    {id: 1, username: "joe", displayName: "Joe", password: "123"},
    {id: 2, username: "donald", displayName: "Donald", password: "1234"},
    {id: 3, username: "melania", displayName: "Melania", password: "12345"},
    {id: 4, username: "xxanus", displayName: "Nibba", password: "123456"},
    {id: 5, username: "anton", displayName: "Anton", password: "123456"},
    {id: 6, username: "moloch", displayName: "Satan", password: "123456"},
]