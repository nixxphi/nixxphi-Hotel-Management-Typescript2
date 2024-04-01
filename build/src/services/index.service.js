"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomTypeService = exports.roomService = exports.userService = void 0;
const generic_service_1 = __importDefault(require("./generic.service"));
const user_model_1 = __importDefault(require("../models/user.model"));
const room_model_1 = __importDefault(require("../models/room.model"));
const roomType_model_1 = __importDefault(require("../models/roomType.model"));
exports.userService = new generic_service_1.default(user_model_1.default);
exports.roomService = new generic_service_1.default(room_model_1.default);
exports.roomTypeService = new generic_service_1.default(roomType_model_1.default);
//# sourceMappingURL=index.service.js.map