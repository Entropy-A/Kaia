import express from "express"
import router from "./routes/index.js"
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

const app = express();
app.use(helmet());
app.use(mongoSanitize())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v0", router);

export default app;