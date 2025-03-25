import {Router} from "express";
import statisticsRoutes from "./statistics.routes.js";

const router = Router();

router.use("/statistics", statisticsRoutes);

export default router;