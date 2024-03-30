"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utils/logger");
exports.default = (error, req, res, next) => {
    logger_1.logger.error(error);
    return res.status(500).json({
        success: false,
        message: error.message
    });
};
