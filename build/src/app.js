"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const main_middleware_1 = __importDefault(require("./middlewares/main.middleware"));
const constants_config_1 = __importDefault(require("./configs/constants.config"));
const app = (0, express_1.default)();
app.use(constants_config_1.default);
(0, main_middleware_1.default)(app);
exports.default = app;
//# sourceMappingURL=app.js.map