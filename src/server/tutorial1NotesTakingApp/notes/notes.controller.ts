import asyncHandler from "$/server/core/decorators/asyncHandler.decorator.js";
import { ApiRequest } from "$/server/core/types/apiRequest.dto.js";
import { ApiResponse } from "$/server/core/types/apiResponse.dto.js";
import Note from "./notes.model.js";
import noteSchema from "$/server/tutorial1NotesTakingApp/notes/notes.types.js";
import { ExtractParams } from "$/server/core/types/extractParams.type.js";

class NotesController {

    @asyncHandler()
    async createNote(request: ApiRequest<noteSchema>, response: ApiResponse<Note>) {
        const note = await Note.create(request.body);
        response.status(200).send({
            success: true,
            data: note,
        });
    }

    @asyncHandler()
    async getAllNotes(request: ApiRequest, response: ApiResponse<Note[]>) {
        const notes = await Note.find().exec();
        response.status(200).send({
            success: true,
            data: notes,
        });
    }

    @asyncHandler()
    async getNote(request: ApiRequest<null, Note, ExtractParams<"/:id">>, response: ApiResponse<Note>) {
        request.params.;
    }
}

export default new NotesController();