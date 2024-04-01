"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_util_1 = require("../utils/token.util");
const index_service_1 = require("../services/index.service");
function authenticateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.startsWith('Bearer ')
                ? authHeader.slice(7)
                : (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized. Please login to continue.',
                });
            }
            // Check token validity
            const isValidToken = yield (0, token_util_1.checkTokenValidity)(token);
            if (!isValidToken) {
                return res.status(401).json({
                    success: false,
                    message: 'Session expired. Sign in again to continue.',
                });
            }
            // Decode user token and find user
            const decoded = yield (0, token_util_1.verifyToken)(token);
            const user = yield index_service_1.userService.find({
                _id: decoded === null || decoded === void 0 ? void 0 : decoded._Id,
                deleted: false,
            });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                });
            }
            // Attach user to request object
            req.user = user;
            next();
        }
        catch (error) {
            console.error("Error authenticating user:", error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error. Please try again later.',
            });
        }
    });
}
exports.default = authenticateUser;
//# sourceMappingURL=authenticate.middleware.js.map