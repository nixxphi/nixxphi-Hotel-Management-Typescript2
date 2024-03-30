import { Request, Response } from 'express';
import { roomService, roomTypeService } from '../services/index.service.ts';

class RoomController {
    // Creating rooms
    async createRoom(req: Request, res: Response): Promise<Response> {
        try {
            const { name, roomType, price } = req.body;

            const isExistingRoom = await roomService.find({
                name
            });

            if (isExistingRoom) {
                return res.status(401).json({
                    success: false,
                    message: 'Room already exists'
                });
            }

            const isExistingRoomType = await roomTypeService.find({
                _id: roomType
            });
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

    // FOR FETCHING ALL ROOMS
    async getRoomsByFilter(req: Request, res: Response): Promise<Response> {
        try {

            const name = req.query.search;
            const roomTypeName = req.query.roomType;
            const minPrice = req.query.minPrice;
            const maxPrice = req.query.maxPrice;
            const query: any = {};

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

            const rooms = await roomService.search(query);
            return res.status(200).json({
                success: true,
                message: "Rooms fetched succesfully",
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

    // FOR FETCHING A SINGLE ROOM BY ID
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
                message: "Room fetched succesfully",
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

    // FOR UPDATING A ROOM BY ID
    async updateRoom(req: Request, res: Response): Promise<Response> {
        try {
            const { name, price, roomType } = req.body;

            const isExistingRoom = await roomService.find({
                name
            });
            if (isExistingRoom) {
                return res.status(401).json({
                    success: false,
                    message: 'Room already exists'
                });
            }

            const isExistingRoomType = await roomTypeService.find({
                _id: roomType
            });
            if (!isExistingRoomType) {
                return res.status(404).json({
                    success: false,
                    message: 'RoomType does not exist'
                });
            }

            const data: any = {};
            if (name) {
                data.name = name;
            }
            if (price) {
                data.price = price;
            }
            if (roomType) {
                data.roomType = isExistingRoomType._id;
            }

            const updatedRoom = await roomService.update(
                req.params.id,
                data
            );

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

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // FOR DELETING A ROOM BY ID
    async deleteRoom(req: Request, res: Response): Promise<Response> {
        try {
            const room = await roomService.getOne(req.params.id);
            if (!room) {
                return res.status(404).json({
                    success: false,
                    message: "Room not found"
                });
            }

            const deletedRoom = await roomService.delete(room._id)
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
