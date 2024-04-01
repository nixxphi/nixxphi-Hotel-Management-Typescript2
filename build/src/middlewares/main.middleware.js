"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const constants_config_js_1 = __importDefault(require("../configs/constants.config.js"));
const errors_middleware_js_1 = __importDefault(require("./errors.middleware.js"));
const main_route_js_1 = __importDefault(require("../routes/main.route.js"));
require("../configs/db.config.js");
exports.default = (app) => {
    app.use((0, morgan_1.default)("common"));
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    (0, main_route_js_1.default)(app);
    app.use(constants_config_js_1.default.PAGENOTFOUND);
    app.use(errors_middleware_js_1.default);
};
//# sourceMappingURL=main.middleware.js.map