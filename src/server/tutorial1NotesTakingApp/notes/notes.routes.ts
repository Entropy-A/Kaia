import { Router } from "express";
import { ApiLogger } from "$/server/app.js";
import { RouteModul } from "$/server/v0/moduls.js";
import NotesController from "$/server/tutorial1NotesTakingApp/notes/notes.controller.js";

const router = Router();

router.route("/")
    .get(NotesController.getAllNotes)
    .post(NotesController.createNote);

router.route("/:id")
    .get();

const RouteModul: RouteModul = {
    path: "/notes",
    router,
    async init() {
        ApiLogger.log("Initialized User Endpoint");
    },
};

export default RouteModul;