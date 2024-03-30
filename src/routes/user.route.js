"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const user_validation_1 = require("../validations/user.validation");
const userRouter = (0, express_1.Router)();
// POST endpoint for user registration
userRouter.post('/register', (0, validate_middleware_1.default)(user_validation_1.RegisterUserSchema), user_controller_1.register);
// POST endpoint for user login
userRouter.post('/login', (0, validate_middleware_1.default)(user_validation_1.LoginUserSchema), user_controller_1.login);
exports.default = userRouter;
