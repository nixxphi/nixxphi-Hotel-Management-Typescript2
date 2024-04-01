"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roomTypeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        default: "3"
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
const RoomType = (0, mongoose_1.model)('RoomType', roomTypeSchema);
exports.default = RoomType;
//# sourceMappingURL=roomType.model.js.map