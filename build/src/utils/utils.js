"use strict";
// OBJECT ID VALIDATOR. 
const ObjectId = require('mongoose').Types.ObjectId;
const validateObjectId = (id) => {
    if (!id || typeof id !== 'string') {
        return false;
    }
    return ObjectId.isValid(id);
};
module.exports = {
    validateObjectId
};
//# sourceMappingURL=utils.js.map