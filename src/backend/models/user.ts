import {model, Schema, Types, Document} from "mongoose";

interface IUser extends Document {
    _id: Types.ObjectId;
    username: string;
    displayName: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true },

    displayName: {
        type: String,
        required: true },

    password: {
        type: String,
        required: true },
})

const User = model<IUser>("User", userSchema);
export default User;