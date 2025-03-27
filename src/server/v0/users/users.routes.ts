import {Router, Request, Response} from "express";
import {ApiLogger} from "$/server/app.js";
import {RouteModul} from "$/server/v0/moduls.js";
import asyncHandler from "$/server/core/middleware/async.handler.js";

const router = Router();

router.route("/:id/:age")
    .get((req: Request<{id: string, age:string}>, res: Response) => {
        res.sendStatus(200)
        console.log(req.params.id, req.params.age)
    })

const RouteModul: RouteModul = {
    path: "/users",
    router,
    async init() {
        ApiLogger.log("Initialized User Endpoint");
    }
}

export default RouteModul;