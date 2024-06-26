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
const roomType_model_1 = __importDefault(require("../models/roomType.model"));
class RoomTypeController {
    // Controller function for creating a new room type
    createRoomType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                const newRoomType = yield roomType_model_1.default.create({ name });
                return res.status(201).json({
                    success: true,
                    message: 'Room type created successfully',
                    data: newRoomType
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
    // Controller function for fetching all room types
    getAllRoomTypes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roomTypes = yield roomType_model_1.default.find();
                return res.status(200).json({
                    success: true,
                    message: "Room types successfully fetched",
                    data: roomTypes
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    // Controller function for fetching a single room type by ID
    getARoomType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                const roomType = yield roomType_model_1.default.findById(_id);
                if (!roomType) {
                    return res.status(404).json({ message: 'Room type not found' });
                }
                res.status(200).json({ data: roomType });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    // Controller function for updating a room type by ID
    updateRoomType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                const _id = req.params.id;
                const roomType = yield roomType_model_1.default.findById(_id);
                if (!roomType) {
                    return res.status(404).json({ message: 'Room type does not exist' });
                }
                const roomTypeAlreadyExists = yield roomType_model_1.default.findOne({ name });
                if (roomTypeAlreadyExists && roomTypeAlreadyExists._id.toString() !== _id) {
                    return res.status(401).json({ message: 'A room type with this name already exists' });
                }
                const updatedRoomType = yield roomType_model_1.default.findByIdAndUpdate(_id, { name }, { new: true });
                if (!updatedRoomType) {
                    return res.status(400).json({ message: 'Something went wrong' });
                }
                return res.status(200).json({ message: 'Room type updated successfully', data: updatedRoomType });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
    // Controller function for deleting a room type by ID
    deleteRoomType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                const roomType = yield roomType_model_1.default.findById(_id);
                if (!roomType) {
                    return res.status(404).json({ message: 'Room type does not exist' });
                }
                const deletedRoomType = yield roomType_model_1.default.findByIdAndDelete(_id);
                if (!deletedRoomType) {
                    return res.status(400).json({ message: 'Something went wrong' });
                }
                return res.status(200).json({ message: 'Room type deleted successfully', data: deletedRoomType });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.default = new RoomTypeController();
//# sourceMappingURL=roomType.controller.js.map