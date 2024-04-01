"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const app_1 = __importDefault(require("./app"));
const logger_js_1 = require("./utils/logger.js");
const PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, () => {
    logger_js_1.logger.info(`listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map