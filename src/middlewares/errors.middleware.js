"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utils/logger");
const errorMiddleware = (error, req, res, next) => {
    logger_1.logger.error(error);
    const status = error.status || 500;
    const message = error.message || 'Internal Server Error';
    return res.status(status).json({
        success: false,
        message: message
    });
};
exports.default = errorMiddleware;
