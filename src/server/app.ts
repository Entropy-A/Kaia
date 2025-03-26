import express from "express"
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import RoutesRegistry from "$/server/v0/routes.registry.js";
import usersRoute from "$/server/v0/users/users.route.js";
import {errorHandler} from "$/server/core/middleware/error.handler.js";
import {Logger, LoggerOrigin} from "$/server/core/utils/index.js";

export const ApiLogger = new Logger(LoggerOrigin.SERVER);

const app = express();
app.use(helmet());
app.use(mongoSanitize())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const {path, router} = await RoutesRegistry.loadRoutes([
    usersRoute,
])

app.use(path, router);
app.use(errorHandler)

export default app;