"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_js_1 = require("../utils/logger.js");
exports.default = (error, req, res, next) => {
    logger_js_1.logger.error(error);
    return res.status(500).json({
        success: false,
        message: error.message
    });
};
//# sourceMappingURL=errors.middleware.js.map