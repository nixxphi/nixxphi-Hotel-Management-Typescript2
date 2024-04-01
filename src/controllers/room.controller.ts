import { Request, Response } from 'express';
import errorHandler  from '../middlewares/errors.middleware';
import { roomService, roomTypeService } from '../services/index.service';
import { Types } from 'mongoose';
import  Room from '../models/room.model';
import { string } from 'joi';

class RoomController {
  // Create room
  async createRoom(req: Request, res: Response) {
    try {
      const { name, roomType, price } = req.body as { name: string; roomType: Types.ObjectId; price: number }; 
  
      const isExistingRoom = await roomService.find({ name });
  
      if (isExistingRoom) {
        return res.status(401).json({
          success: false,
          message: 'Room already exists',
        });
      }

      const isExistingRoomType = await roomTypeService.find({ _id: roomType });
      if (!isExistingRoomType) {
        return res.status(404).json({
          success: false,
          message: 'RoomType does not exist',
        });
      }

      // Assume roomService.create returns an object similar to the request body
      const newRoom = await roomService.create({
        name, roomType, price,
        createdAt: new NativeDate,
        updatedAt: new NativeDate,
        deleted: false
      });

      return res.status(201).json({
        message: 'Room created successfully',
        data: newRoom,
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  // Get rooms by filter
  async getRoomsByFilter(req: Request, res: Response) {
    try {
      const name = req.query.search;
      const roomTypeName = req.query.roomType;
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
      const query: any = {};

      const rooms = await roomService.search(query);
      return res.status(200).json({
        success: true,
        message: 'Rooms fetched successfully',
        data: rooms,
      });
    } catch (error:any) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  // Get a room by ID
  async getARoom(req: Request, res: Response) {
    try {
      const roomId = req.params.id; // Assuming ID is a string
  
      // Use findById for retrieving a room by ID
      const room = await Room.findById(roomId);
  
      if (!room) {
        // No room found, handle the case
        return res.status(404).json({ message: 'Room not found' });
      }
  
      return res.status(200).json({
        success: true,
        message: 'Room fetched successfully',
        data: room,
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }
  
  // Update a room by ID
   async updateRoom(req: Request, res: Response) {
    try {
      const { name, price, roomType } = req.body;
      const roomId = req.params.id; 
      // Check for existing room with the same name (excluding itself)
      const isExistingRoom = await Room.findById(roomId);

      if (isExistingRoom && isExistingRoom._id.toString() !== req.params.id) {
        return res.status(401).json({
          success: false,
          message: 'Room already exists',
        });
      }

      // Check for existing room type
      const isExistingRoomType = await roomTypeService.find({ _id: roomType });
      if (!isExistingRoomType) {
        return res.status(404).json({
          success: false,
          message: 'RoomType does not exist',
        });
      }

      // Prepare update data object for partial updates
      const data: Partial<typeof req.body> = {};
      if (name) data.name = name;
      if (price) data.price = price;
      if (roomType) data.roomType = roomType;

      // Update the room using the service
      const updatedRoom = await roomService.update(req.params.id, data);

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
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  // FOR DELETING A ROOM BY ID
  async deleteRoom(req: Request, res: Response) {
    try {
      const roomId = req.params.id as string; 

      const room = await Room.findById(roomId);

      if (!room) {
        // For handling cases where room is not found
        return res.status(404).json({ message: 'Room not found' });
      }

      const deletedRoom = await roomService.delete(room._id);

      if (!deletedRoom) {
        // Handle potential deletion error from service
        return res.status(400).json({ message: 'Room not deleted' });
      }

      return res.status(200).json({
        success: true,
        message: 'Room deleted successfully',
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new RoomController();