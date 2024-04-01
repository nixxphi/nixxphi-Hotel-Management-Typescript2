import { model, Schema } from 'mongoose'

const roomTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    deleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export default model('RoomType', roomTypeSchema)