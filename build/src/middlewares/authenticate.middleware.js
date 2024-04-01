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
const token_util_js_1 = require("../utils/token.util.js");
const index_service_js_1 = require("../services/index.service.js");
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authHeaders = req.header('Authorization');
    const token = authHeaders && authHeaders.substring(0, 7) === 'Bearer '
        ? authHeaders.replace('Bearer ', '')
        : (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (!token) {
        return res.status(404).json({
            success: false,
            message: 'Login to continue',
        });
    }
    // Extracts the expiration date from the token available
    const isValidToken = yield (0, token_util_js_1.checkTokenValidity)(token);
    if (!isValidToken) {
        return res.status(404).json({
            success: false,
            message: 'Session expired. Sign in again to continue.',
        });
    }
    // Decode the user token to get user credentials
    const decoded = yield (0, token_util_js_1.verifyToken)(token);
    const user = yield index_service_js_1.userService.find({
        _id: decoded._id,
        deleted: false
    });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }
    req.user = user;
    next();
});
//# sourceMappingURL=authenticate.middleware.js.map