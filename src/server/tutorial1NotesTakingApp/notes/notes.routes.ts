import { Router } from "express";
import { ApiLogger } from "$/server/app.js";
import { RouteModul } from "$/server/v0/moduls.js";
import NotesController from "$/server/tutorial1NotesTakingApp/notes/notes.controller.js";
import { validate } from "$/server/core/middleware/validation.handler.js";
import noteSchema from "$/server/tutorial1NotesTakingApp/notes/notes.types.js";

export enum NoteRoutes {
    root = "/",
    $id = "/:id",
}

const router = Router();

router.route(NoteRoutes.root)
    .get(NotesController.getAllNotes)
    .post(validate({ body: noteSchema }), NotesController.createNote);

router.route(NoteRoutes.$id)
    .get(NotesController.getNote)
    .patch(validate({ body: noteSchema }), NotesController.updateNote)
    .delete(NotesController.deleteNote);

const RouteModul: RouteModul = {
    path: "/notes",
    router,
    async init() {
        ApiLogger.log("Initialized User Endpoint");
    },
};

export default RouteModul;