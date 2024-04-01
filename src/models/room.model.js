import { model, Schema } from 'mongoose'

const roomSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    roomType: {
        type: Schema.Types.ObjectId,
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

export default model('Room', roomSchema)