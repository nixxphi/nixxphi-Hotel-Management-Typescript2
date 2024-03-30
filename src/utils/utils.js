"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateObjectId = void 0;
const mongoose_1 = require("mongoose");
// OBJECT ID VALIDATOR.
const { ObjectId } = mongoose_1.Types;
const validateObjectId = (id) => {
    if (!id || typeof id !== 'string') {
        return false;
    }
    return ObjectId.isValid(id);
};
exports.validateObjectId = validateObjectId;
