"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
exports.default = (req, res, next) => {
    let user = new user_model_1.default;
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. You are not authorized to perform this action.' });
    }
    next();
};
//# sourceMappingURL=authorize.middleware.js.map