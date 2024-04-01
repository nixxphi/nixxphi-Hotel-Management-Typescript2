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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_service_1 = require("../services/index.service");
const room_model_1 = __importDefault(require("../models/room.model"));
class RoomController {
    // Create room
    createRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, roomType, price } = req.body;
                const isExistingRoom = yield index_service_1.roomService.find({ name });
                if (isExistingRoom) {
                    return res.status(401).json({
                        success: false,
                        message: 'Room already exists',
                    });
                }
                const isExistingRoomType = yield index_service_1.roomTypeService.find({ _id: roomType });
                if (!isExistingRoomType) {
                    return res.status(404).json({
                        success: false,
                        message: 'RoomType does not exist',
                    });
                }
                // Assume roomService.create returns an object similar to the request body
                const newRoom = yield index_service_1.roomService.create({
                    name, roomType, price,
                    createdAt: new NativeDate,
                    updatedAt: new NativeDate,
                    deleted: false
                });
                return res.status(201).json({
                    message: 'Room created successfully',
                    data: newRoom,
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    // Get rooms by filter
    getRoomsByFilter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.query.search;
                const roomTypeName = req.query.roomType;
                const minPrice = req.query.minPrice;
                const maxPrice = req.query.maxPrice;
                const query = {};
                const rooms = yield index_service_1.roomService.search(query);
                return res.status(200).json({
                    success: true,
                    message: 'Rooms fetched successfully',
                    data: rooms,
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    // Get a room by ID
    getARoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roomId = req.params.id; // Assuming ID is a string
                // Use findById for retrieving a room by ID
                const room = yield room_model_1.default.findById(roomId);
                if (!room) {
                    // No room found, handle the case
                    return res.status(404).json({ message: 'Room not found' });
                }
                return res.status(200).json({
                    success: true,
                    message: 'Room fetched successfully',
                    data: room,
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    // Update a room by ID
    updateRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, price, roomType } = req.body;
                const roomId = req.params.id;
                // Check for existing room with the same name (excluding itself)
                const isExistingRoom = yield room_model_1.default.findById(roomId);
                if (isExistingRoom && isExistingRoom._id.toString() !== req.params.id) {
                    return res.status(401).json({
                        success: false,
                        message: 'Room already exists',
                    });
                }
                // Check for existing room type
                const isExistingRoomType = yield index_service_1.roomTypeService.find({ _id: roomType });
                if (!isExistingRoomType) {
                    return res.status(404).json({
                        success: false,
                        message: 'RoomType does not exist',
                    });
                }
                // Prepare update data object for partial updates
                const data = {};
                if (name)
                    data.name = name;
                if (price)
                    data.price = price;
                if (roomType)
                    data.roomType = roomType;
                // Update the room using the service
                const updatedRoom = yield index_service_1.roomService.update(req.params.id, data);
                if (!updatedRoom) {
                    return res.status(400).json({
                        success: false,
                        message: 'Room not updated',
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: 'Room updated successfully',
                    data: updatedRoom,
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    // FOR DELETING A ROOM BY ID
    deleteRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roomId = req.params.id;
                const room = yield room_model_1.default.findById(roomId);
                if (!room) {
                    // For handling cases where room is not found
                    return res.status(404).json({ message: 'Room not found' });
                }
                const deletedRoom = yield index_service_1.roomService.delete(room._id);
                if (!deletedRoom) {
                    // Handle potential deletion error from service
                    return res.status(400).json({ message: 'Room not deleted' });
                }
                return res.status(200).json({
                    success: true,
                    message: 'Room deleted successfully',
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.default = new RoomController();
//# sourceMappingURL=room.controller.js.map