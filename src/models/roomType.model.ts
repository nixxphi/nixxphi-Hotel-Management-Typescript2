import { model, Schema } from 'mongoose'

const roomTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    rank:{
        type: Number,
        default: "3"
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})
const RoomType = model('RoomType', roomTypeSchema);
export default RoomType<Schema>;