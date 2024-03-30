import { Schema, model, Document } from 'mongoose';

interface IRoomType extends Document {
    name: string;
    deleted: boolean;
}

const roomTypeSchema: Schema<IRoomType> = new Schema<IRoomType>({
    name: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default model<IRoomType>('RoomType', roomTypeSchema);
