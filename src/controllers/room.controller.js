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
    // Creating rooms
    createRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, roomType, price } = req.body;
                const isExistingRoom = yield index_service_1.roomService.find({
                    name
                });
                if (isExistingRoom) {
                    return res.status(401).json({
                        success: false,
                        message: 'Room already exists'
                    });
                }
                const isExistingRoomType = yield index_service_1.roomTypeService.find({
                    _id: roomType
                });
                if (!isExistingRoomType) {
                    return res.status(404).json({
                        success: false,
                        message: 'RoomType does not exist'
                    });
                }
                const newRoom = yield index_service_1.roomService.create({ name, roomType, price });
                return res.status(201).json({
                    message: 'Room created successfully',
                    data: newRoom
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    // FOR FETCHING ALL ROOMS
    getRoomsByFilter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.query.search;
                const roomTypeName = req.query.roomType;
                const minPrice = req.query.minPrice;
                const maxPrice = req.query.maxPrice;
                const query = {};
                if (name) {
                    query.name = name;
                }
                if (roomTypeName) {
                    query["roomType.name"] = roomTypeName;
                }
                if (minPrice && maxPrice) {
                    // Adds the price range to the filter object and sets status to true
                    query.price = { $gte: minPrice, $lte: maxPrice };
                }
                else if (minPrice) {
                    // Adds the minimum price to the filter object and sets status to true
                    query.price = { $gte: minPrice };
                }
                else if (maxPrice) {
                    // Adds the maximum price to the filter object and sets status to true
                    query.price = { $gte: maxPrice, $lte: 0 };
                }
                const rooms = yield index_service_1.roomService.search(query);
                return res.status(200).json({
                    success: true,
                    message: "Rooms fetched succesfully",
                    data: rooms
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
    // FOR FETCHING A SINGLE ROOM BY ID
    getARoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const room = yield index_service_1.roomService.getOne(req.params.id);
                if (!room) {
                    return res.status(404).json({
                        success: false,
                        message: "Room not found"
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: "Room fetched succesfully",
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
    // FOR UPDATING A ROOM BY ID
    updateRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, price, roomType } = req.body;
                const isExistingRoom = yield index_service_1.roomService.find({
                    name
                });
                if (isExistingRoom) {
                    return res.status(401).json({
                        success: false,
                        message: 'Room already exists'
                    });
                }
                const isExistingRoomType = yield index_service_1.roomTypeService.find({
                    _id: roomType
                });
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
                    message: error.message
                });
            }
        });
    }
    // FOR DELETING A ROOM BY ID
    deleteRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const room = yield index_service_1.roomService.getOne(req.params.id);
                if (!room) {
                    return res.status(404).json({
                        success: false,
                        message: "Room not found"
                    });
                }
                const deletedRoom = yield index_service_1.roomService.delete(room._id);
                if (!deletedRoom) {
                    return res.status(400).json({
                        success: false,
                        message: 'Room not deleted'
                    });
                }
                return res.status(200).json({
                    success: true,
                    message: "Room deleted succesfully",
                    data: deletedRoom
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
}
exports.default = new RoomController();
