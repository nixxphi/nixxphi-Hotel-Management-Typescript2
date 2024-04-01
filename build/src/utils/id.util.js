"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const logger_js_1 = require("./logger.js");
/**
 * @param id
 * @param helpers
 * @returns
 */
function validateObjectId(id, helpers) {
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        logger_js_1.logger.error("Invalid Object Id");
        return helpers.error("Invalid Object Id");
    }
    return id;
}
exports.default = validateObjectId;
//# sourceMappingURL=id.util.js.map