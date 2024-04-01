"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roomType_controller_js_1 = __importDefault(require("../controllers/roomType.controller.js"));
const authenticate_middleware_js_1 = __importDefault(require("../middlewares/authenticate.middleware.js"));
const validate_middleware_js_1 = __importDefault(require("../middlewares/validate.middleware.js"));
const authorize_middleware_js_1 = __importDefault(require("../middlewares/authorize.middleware.js"));
const roomType_validation_js_1 = require("../validations/roomType.validation.js");
const roomTypeRouter = (0, express_1.Router)();
// POST endpoint for creating a new room type
roomTypeRouter.post('/', authenticate_middleware_js_1.default, (0, validate_middleware_js_1.default)(roomType_validation_js_1.CreateRoomTypeSchema), roomType_controller_js_1.default.createRoomType);
// GET endpoint for fetching all room types
roomTypeRouter.get('/', roomType_controller_js_1.default.getAllRoomTypes);
// GET endpoint for getting a room type by ID
roomTypeRouter.get('/:id', authenticate_middleware_js_1.default, roomType_controller_js_1.default.getARoomType);
// PATCH endpoint for updating a room type by ID
roomTypeRouter.patch('/:id', authenticate_middleware_js_1.default, authorize_middleware_js_1.default, (0, validate_middleware_js_1.default)(roomType_validation_js_1.EditRoomTypeSchema), roomType_controller_js_1.default.updateRoomType);
// DELETE endpoint for deleting a room type by ID
roomTypeRouter.delete('/:id', roomType_controller_js_1.default.deleteRoomType);
exports.default = roomTypeRouter;
//# sourceMappingURL=roomType.route.js.map