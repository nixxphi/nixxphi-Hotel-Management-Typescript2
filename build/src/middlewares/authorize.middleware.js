"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. You are not authorized to perform this action.' });
    }
    next();
};
//# sourceMappingURL=authorize.middleware.js.map