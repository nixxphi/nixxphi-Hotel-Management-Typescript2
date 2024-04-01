"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserSchema = exports.RegisterUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.RegisterUserSchema = {
    body: joi_1.default.object({
        username: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
        role: joi_1.default.string().valid("admin", "guest").optional()
    })
};
exports.LoginUserSchema = {
    body: joi_1.default.object({
        username: joi_1.default.string().required(),
        password: joi_1.default.string().required()
    })
};
//# sourceMappingURL=user.validation.js.map