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
const index_service_1 = require("../services/index.service");
class RoomController {
    createRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, roomType, price } = req.body;
                const isExistingRoom = yield index_service_1.roomService.find({ name });
                if (isExistingRoom) {
                    return res.status(401).json({
                        success: false,
                        message: 'Room already exists'
                    });
                }
                const isExistingRoomType = yield index_service_1.roomTypeService.find({ _id: roomType });
                if (!isExistingRoomType) {
                    return res.status(404).json({
                        success: false,
                        message: 'RoomType does not exist'
                    });
                }
                const newRoom = { name, roomType, price }; // Use the Room interface
                const createdRoom = yield index_service_1.roomService.create(newRoom);
                return res.status(201).json({
                    message: 'Room created successfully',
                    data: createdRoom
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    success: false,
                    message: error.message // Consider more specific error handling
                });
            }
        });
    }
    getRoomsByFilter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            try {
                const name = ((_a = req.query.search) === null || _a === void 0 ? void 0 : _a.toString()) || '';
                const roomTypeName = ((_b = req.query.roomType) === null || _b === void 0 ? void 0 : _b.toString()) || '';
                const minPrice = parseInt(((_c = req.query.minPrice) === null || _c === void 0 ? void 0 : _c.toString()) || '0');
                const maxPrice = parseInt(((_d = req.query.maxPrice) === null || _d === void 0 ? void 0 : _d.toString()) || '0');
                const query = {};
                if (name) {
                    query.name = name;
                }
                if (roomTypeName) {
                    query['roomType.name'] = roomTypeName; // Assuming a nested structure for roomType
                }
                if (minPrice && maxPrice) {
                    query.price = { $gte: minPrice, $lte: maxPrice };
                }
                else if (minPrice) {
                    query.price = { $gte: minPrice };
                }
                else if (maxPrice) {
                    query.price = { $lte: maxPrice };
                }
                const rooms = yield index_service_1.roomService.search(query);
                return res.status(200).json({
                    success: true,
                    message: 'Rooms fetched successfully',
                    data: rooms
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    success: false,
                    message: error.message // Consider more specific error handling
                });
            }
        });
    }
    getARoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const room = yield index_service_1.roomService.getOne(req.params.id);
                if (room === null) { // Check for null to handle missing room
                    const errorMessage = 'Room not found';
                    console.error(errorMessage);
                    return res.status(404).json({
                        success: false,
                        message: errorMessage
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: 'Room fetched successfully',
                    data: room
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    success: false,
                    message: error.message
                });
            }
        });
    }
    updateRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, price, roomType } = req.body;
                const isExistingRoom = yield index_service_1.roomService.find({ name });
                if (isExistingRoom) {
                    return res.status(401).json({
                        success: false,
                        message: 'Room already exists'
                    });
                }
                const isExistingRoomType = yield index_service_1.roomTypeService.find({ _id: roomType });
                if (!isExistingRoomType) {
                    return res.status(404).json({
                        success: false,
                        message: 'RoomType does not exist'
                    });
                }
                const data = {};
                if (name) {
                    data.name = name;
                }
                if (price) {
                    data.price = price;
                }
                if (roomType) {
                    data.roomType = isExistingRoomType._id;
                }
                const updatedRoom = yield index_service_1.roomService.update(req.params.id, data);
                if (!updatedRoom) {
                    return res.status(400).json({
                        success: false,
                        message: 'Room not updated'
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: 'Room updated successfully',
                    data: updatedRoom
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    success: false,
                    message: error.message // Consider more specific error handling
                });
            }
        });
    }
    deleteRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const room = yield index_service_1.roomService.getOne(req.params.id);
                if (room === null) {
                    const errorMessage = 'Room not found';
                    console.error(errorMessage);
                    return res.status(404).json({
                        success: false,
                        message: errorMessage
                    });
                }
                const deletedRoom = yield index_service_1.roomService.delete(room._id); // Assuming roomService.delete returns the deleted room
                if (!deletedRoom) { // Check if the deletion was successful
                    return res.status(400).json({
                        success: false,
                        message: 'Room not deleted'
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: 'Room deleted successfully',
                    data: deletedRoom // Return the deleted room's data
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({
                    success: false,
                    message: error.message // Consider more specific error handling
                });
            }
        });
    }
}
exports.default = new RoomController();
