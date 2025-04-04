import { Router } from "express";
import { ApiLogger } from "$/app.js";
import { RouteModul } from "$/tutorial1NotesTakingApp/moduls.js";
import NotesController from "$/tutorial1NotesTakingApp/notes/notes.controller.js";
import { validate } from "$/core/middleware/validation.handler.js";
import noteSchema from "$/tutorial1NotesTakingApp/notes/notes.types.js";

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