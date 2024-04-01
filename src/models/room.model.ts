import mongoose, { model, Schema } from 'mongoose'

const roomSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    roomType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RoomType",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})
export const Room = model('Room', roomSchema)
export default model<typeof Room>('Room', roomSchema);