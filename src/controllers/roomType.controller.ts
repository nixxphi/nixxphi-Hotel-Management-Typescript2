import { Request, Response } from 'express';
import { roomService, roomTypeService } from '../services/index.service';

class RoomTypeController {
    // Controller function for creating a new room type
    async createRoomType(req: Request, res: Response): Promise<Response> {
        try {
            const { name } = req.body;

            const newRoomType = await roomTypeService.create({ name });
            if (!newRoomType) {
                return res.status(400).json({
                    success: false,
                    message: 'Room type not created'
                });
            }

            return res.status(201).json({
                success: true,
                message: 'Room type created successfully',
                data: newRoomType
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };

    // Controller function for fetching all room types
    async getAllRoomTypes(req: Request, res: Response): Promise<Response> {
        try {
            const roomTypes = await roomTypeService.search();
            return res.status(200).json({
                success: true,
                message: "Room types successfully fetched",
                data: roomTypes
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    // Controller function for fetching a single room type by ID
    async getARoomType(req: Request, res: Response): Promise<Response> {
        try {
            const roomType = await roomTypeService.find(req.params.id);
            if (!roomType) {
                return res.status(404).json({ message: 'Room type not found' });
            }
            res.status(200).json({ data: roomType });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    // Controller function for updating a room type by ID
    async updateRoomType(req: Request, res: Response): Promise<Response> {
        try {
            const { name } = req.body;
            const _id = req.params.id;

            const roomType = await roomTypeService.find({ _id });
            if (!roomType) {
                return res.status(404).json({ message: 'Room type does not exist' });
            }

            const roomTypeWithNameAlreadyExists = await roomTypeService.find({ name });
            if (roomTypeWithNameAlreadyExists) {
                return res.status(401).json({ message: 'A room type with this name already exists' });
            }

            const updatedRoomType = await roomTypeService.update(
                { _id },
                { name: name }
            );

            if (!updatedRoomType) {
                return res.status(400).json({ message: 'Something went wrong' });
            }
            return res.status(200).json({ message: 'Room type updated successfully', data: updatedRoomType });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    };

    // Controller function for deleting a room type by ID
    async deleteRoomType(req: Request, res: Response): Promise<Response> {
        try {
            const _id = req.params.id;

            const roomType = await roomTypeService.find({ _id });
            if (!roomType) {
                return res.status(401).json({ message: 'Room type does not exist' });
            }

            const deletedRoomType = await roomTypeService.delete({ _id: roomType._id });

            if (!deletedRoomType) {
                return res.status(400).json({ message: 'Something went wrong' });
            }
            return res.status(200).json({ message: 'Room type deleted successfully', data: deletedRoomType });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    };
}

export default new RoomTypeController();
