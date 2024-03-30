"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const room_validation_1 = require("../validations/room.validation");
// CREATE A NEW ROUTER INSTANCE
const roomRouter = (0, express_1.Router)();
// POST endpoint for creating a new room
roomRouter.post('/', (0, validate_middleware_1.default)(room_validation_1.CreateRoomSchema), roomController.createRoom);
// GET endpoint for fetching all rooms
roomRouter.get('/', roomController.getRoomsByFilter);
// GET endpoint for fetching a single room by ID
roomRouter.get('/:id', roomController.getARoom);
// PATCH endpoint for updating a room by ID
roomRouter.patch('/:id', roomController.updateRoom);
// DELETE endpoint for deleting a room by ID
roomRouter.delete('/:id', roomController.deleteRoom);
exports.default = roomRouter;
