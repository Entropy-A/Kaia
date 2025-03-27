import express from "express"
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import RoutesRegistry from "$/server/tutorial0ProductBlog/moduls.js";
import usersRoute from "$/server/tutorial0ProductBlog/products/products.routes.js";
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
ApiLogger.log(`Loaded ${path} routes`)

app.use(path, router);
app.use(errorHandler)

export default app;