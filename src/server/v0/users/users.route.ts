import {Router, Request, Response} from "express";
import {ApiLogger} from "$/server/app.js";

const router = Router();

router.route("/")
    .get((request: Request, response: Response) => {
        response.send("USER")
    })

export default {
    path: "/users",
    router,
    async init() {
        ApiLogger.log("Initialized Users Endpoint");
    }
}