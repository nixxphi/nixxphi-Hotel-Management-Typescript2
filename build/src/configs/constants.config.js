"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Function for handling Page Not Found errors 
function PAGENOTFOUND(req, res) {
    const errorResponse = {
        success: false,
        message: "You're looking for a resource that does not exist",
    };
    res.json(errorResponse);
}
exports.default = PAGENOTFOUND;
//# sourceMappingURL=constants.config.js.map