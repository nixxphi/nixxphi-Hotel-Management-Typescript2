import { Request, Response } from 'express';
import { roomService, roomTypeService } from '../services/index.service';
import { error } from './middlewares/errors.middleware';

class RoomController {
    async createRoom(req: Request, res: Response): Promise<Response> {
        try {
            const { name, roomType, price }: { name: string, roomType: string, price: number } = req.body;

            const isExistingRoom = await roomService.find({ name });

            if (isExistingRoom) {
                return res.status(401).json({
                    success: false,
                    message: 'Room already exists'
                });
            }

            const isExistingRoomType = await roomTypeService.find({ _id: roomType });
            if (!isExistingRoomType) {
                return res.status(404).json({
                    success: false,
                    message: 'RoomType does not exist'
                });
            }

            const newRoom = await roomService.create({ name, roomType, price });

            return res.status(201).json({
                message: 'Room created successfully',
                data: newRoom
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }

    async getRoomsByFilter(req: Request, res: Response): Promise<Response> {
        try {
            const { search, roomType, minPrice, maxPrice } = req.query;
            const query: any = {};

            if (search) {
                query.name = search.toString();
            }

            if (roomType) {
                query["roomType.name"] = roomType.toString();
            }

            if (minPrice && maxPrice) {
                query.price = { $gte: parseInt(minPrice.toString()), $lte: parseInt(maxPrice.toString()) };
            } else if (minPrice) {
                query.price = { $gte: parseInt(minPrice.toString()) };
            } else if (maxPrice) {
                query.price = { $lte: parseInt(maxPrice.toString()) };
            }

            const rooms = await roomService.search(query);
            return res.status(200).json({
                success: true,
                message: "Rooms fetched successfully",
                data: rooms
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getARoom(req: Request, res: Response): Promise<Response> {
        try {
            const room = await roomService.getOne(req.params.id);
            if (!room) {
                return res.status(404).json({
                    success: false,
                    message: "Room not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Room fetched successfully",
                data: room
            })

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message
            })

        }
    }

    async updateRoom(req: Request, res: Response): Promise<Response> {
        try {
            const { name, price, roomType }: { name?: string, price?: number, roomType?: string } = req.body;

            // Validate if room exists
            const room = await roomService.getOne(req.params.id);
            if (!room) {
                return res.status(404).json({
                    success: false,
                    message: 'Room not found'
                });
            }

            // Update room
            if (name) room.name = name;
            if (price) room.price = price;
            if (roomType) {
                // Validate if roomType exists
                const existingRoomType = await roomTypeService.find({ _id: roomType });
                if (!existingRoomType) {
                    return res.status(404).json({
                        success: false,
                        message: 'RoomType does not exist'
                    });
                }
                room.roomType = existingRoomType._id;
            }

            // Save updated room
            const updatedRoom = await roomService.update(room._id, room);

            return res.status(200).json({
                success: true,
                message: 'Room updated successfully',
                data: updatedRoom
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async deleteRoom(req: Request, res: Response): Promise<Response> {
        try {
            const room = await roomService.getOne(req.params.id);
            if (!room) {
                return res.status(404).json({
                    success: false,
                    message: "Room not found"
                });
            }

            const deletedRoom = await roomService.delete(room._id);
            if (!deletedRoom) {
                return res.status(400).json({
                    success: false,
                    message: 'Room not deleted'
                });
            }

            return res.status(200).json({
                success: true,
                message: "Room deleted successfully",
                data: deletedRoom
            })

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message
            })

        }
    }
}

export default new RoomController();
