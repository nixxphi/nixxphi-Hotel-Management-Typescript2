import mongoose, { model, Schema } from 'mongoose'

const roomSchema = new mongoose.Schema({
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
const Room = mongoose.model('Room', roomSchema)
export default Room<Schema>;