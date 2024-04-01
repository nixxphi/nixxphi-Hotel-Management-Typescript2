"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditRoomTypeSchema = exports.CreateRoomTypeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id_util_js_1 = __importDefault(require("../utils/id.util.js"));
exports.CreateRoomTypeSchema = {
    body: joi_1.default.object({
        name: joi_1.default.string().required()
    })
};
exports.EditRoomTypeSchema = {
    body: joi_1.default.object({
        name: joi_1.default.string().required()
    }),
    params: joi_1.default.object({
        id: joi_1.default.string().custom(id_util_js_1.default, 'object id validation').required()
    })
};
//# sourceMappingURL=roomType.validation.js.map