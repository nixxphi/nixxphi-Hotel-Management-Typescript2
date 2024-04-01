"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class CustomError extends mongoose_1.Error {
}
function errorHandler(err, req, res, next) {
    console.error(err.stack || err.message);
    let statusCode = 500;
    if (err instanceof CustomError && err.statusCode) {
        statusCode = err.statusCode;
    }
    else if (err.name === 'ValidationError') {
        statusCode = 400; // Bad Request
    }
    else if (err.name === 'UnauthorizedError') {
        statusCode = 401; // Unauthorized
    }
    res.status(statusCode).json({ message: err.message });
}
exports.default = errorHandler;
//# sourceMappingURL=errors.middleware.js.map