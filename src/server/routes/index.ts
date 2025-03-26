import {Router} from "express";
import statisticsRouter from "./statistics.routes.js";

const router = Router();

router.use("/statistics", statisticsRouter);

export default router;