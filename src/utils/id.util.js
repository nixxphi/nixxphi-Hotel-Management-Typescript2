"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const logger_1 = require("./logger");
exports.default = (id, helpers) => {
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        logger_1.logger.error("Invalid Object Id");
        return helpers.error("Invalid Object Id").toString();
    }
    return id;
};
