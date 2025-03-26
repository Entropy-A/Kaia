import {Schema, model, Document, Types} from "mongoose";

export interface IStatistic extends Document {
    _id: Types.ObjectId;
    name: string;
    description?: string;
    thumbnail?: string;
}

const statisticSchema = new Schema<IStatistic>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    thumbnail:{
        type: String,
        required: false,
    }
}, {
    timestamps: true // createdAt, updatedAt
});

const Statistic = model<IStatistic>("Statistic", statisticSchema);
export default Statistic;