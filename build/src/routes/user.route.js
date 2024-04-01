"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_js_1 = require("../controllers/user.controller.js");
const validate_middleware_js_1 = __importDefault(require("../middlewares/validate.middleware.js"));
const user_validation_js_1 = require("../validations/user.validation.js");
const userRouter = (0, express_1.Router)();
// POST endpoint for user registration
userRouter.post('/register', (0, validate_middleware_js_1.default)(user_validation_js_1.RegisterUserSchema), user_controller_js_1.register);
// POST endpoint for user login
userRouter.post('/login', (0, validate_middleware_js_1.default)(user_validation_js_1.LoginUserSchema), user_controller_js_1.login);
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map