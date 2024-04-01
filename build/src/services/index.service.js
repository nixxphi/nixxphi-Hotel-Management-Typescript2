"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.roomTypeService = exports.roomService = void 0;
const generic_service_js_1 = __importDefault(require("./generic.service.js"));
const user_model_js_1 = __importDefault(require("../models/user.model.js"));
const room_model_js_1 = __importDefault(require("../models/room.model.js"));
const roomType_model_js_1 = __importDefault(require("../models/roomType.model.js"));
exports.roomService = new generic_service_js_1.default(room_model_js_1.default);
exports.roomTypeService = new generic_service_js_1.default(roomType_model_js_1.default);
exports.userService = new generic_service_js_1.default(user_model_js_1.default);
//# sourceMappingURL=index.service.js.map