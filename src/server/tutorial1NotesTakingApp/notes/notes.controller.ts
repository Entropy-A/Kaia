import asyncHandler from "$/server/core/decorators/asyncHandler.decorator.js";
import { ApiRequest, ApiResponse } from "$/server/core/types/api.core.dto.js";
import Note from "./notes.model.js";
import noteSchema from "$/server/tutorial1NotesTakingApp/notes/notes.types.js";
import { ExtractParams } from "$/server/core/types/extractParams.type.js";
import { ApiError, NotFoundError } from "$/server/core/errors/index.js";
import { NoteRoutes } from "$/server/tutorial1NotesTakingApp/notes/notes.routes.js";

class NotesController {

    @asyncHandler()
    async createNote(request: ApiRequest<noteSchema, Note>, response: ApiResponse<Note>) {
        const note = await Note.create(request.body);
        response.status(200).send({
            success: true,
            data: note,
        });
    }

    @asyncHandler()
    async getAllNotes(request: ApiRequest<null, Note[]>, response: ApiResponse<Note[]>) {
        const notes = await Note.find().exec();
        response.status(200).send({
            success: true,
            data: notes,
        });
    }

    @asyncHandler()
    async getNote(request: ApiRequest<null, Note, ExtractParams<NoteRoutes.$id>>, response: ApiResponse<Note>) {
        const { id } = request.params;
        const note = await Note.findById(id);
        if (!note) throw new NotFoundError("Note does not exist");
        response.status(200).send({
            success: true,
            data: note,
        });
    }

    @asyncHandler()
    async updateNote(request: ApiRequest<noteSchema, Note, ExtractParams<NoteRoutes.$id>>, response: ApiResponse<Note>) {
        const { id } = request.params;
        const note = await Note.findByIdAndUpdate(id, request.body, { new: true }).exec();
        if (!note) throw new NotFoundError("Note does not exist");
        response.status(200).send({
            success: true,
            data: note,
        });
    }
    
    @asyncHandler()
    async deleteNote(request: ApiRequest<null, null, ExtractParams<NoteRoutes.$id>>, response: ApiResponse<Note>) {
        const { id } = request.params;
        const note = await Note.findByIdAndDelete(id).exec();
        if (!note) throw new NotFoundError("Note does not exist");
        response.status(200).send({
            success: true,
            delete: true,
            data: note,
        });
    }
}

export default new NotesController();