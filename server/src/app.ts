import express from "express";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import RoutesRegistry from "./tutorial1NotesTakingApp/moduls.js";
import notesRoute from "./tutorial1NotesTakingApp/notes/notes.routes.js";
import { errorHandler } from "$/core/middleware/index.js";
import { Logger, LoggerOrigin } from "./core/utils/index.js";
import notFoundHandler from "./core/middleware/notFound.handler.js";

export const ApiLogger = new Logger(LoggerOrigin.SERVER);

const app = express();
app.use(helmet());
app.use(mongoSanitize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { version, router } = await RoutesRegistry.loadRoutes([
    notesRoute,
]);

app.use("/api" + version, router);
app.use(notFoundHandler(version));
app.use(errorHandler);

export default app;