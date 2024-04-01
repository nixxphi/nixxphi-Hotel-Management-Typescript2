"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const room_controller_js_1 = __importDefault(require("../controllers/room.controller.js"));
const validate_middleware_js_1 = __importDefault(require("../middlewares/validate.middleware.js"));
const room_validation_js_1 = require("../validations/room.validation.js");
// CREATE A NEW ROUTER INSTANCE
const roomRouter = (0, express_1.Router)();
// POST endpoint for creating a new room
roomRouter.post('/', (0, validate_middleware_js_1.default)(room_validation_js_1.CreateRoomSchema), room_controller_js_1.default.createRoom);
// GET endpoint for fetching all rooms
roomRouter.get('/', room_controller_js_1.default.getRoomsByFilter);
// GET endpoint for fetching a single room by ID
roomRouter.get('/:id', room_controller_js_1.default.getARoom);
// PATCH endpoint for updating a room by ID
roomRouter.patch('/:id', room_controller_js_1.default.updateRoom);
// DELETE endpoint for deleting a room by ID
roomRouter.delete('/:id', room_controller_js_1.default.deleteRoom);
exports.default = roomRouter;
//# sourceMappingURL=room.route.js.map