import { model, Schema, Types, Document } from "mongoose";
import type noteSchema from "./notes.types.js";

interface Note extends noteSchema, Document{
    _id: Types.ObjectId;
}

const noteModelSchema = new Schema<Note>({
    title: {
        type: String,
        required: true,
        unique: true,
    },

    text: {
        type: String,
    },
}, {
    timestamps: true,
});

const Note = model<Note>("Note", noteModelSchema);
export default Note;