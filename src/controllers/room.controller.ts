import { Request, Response } from 'express';
import { roomService, roomTypeService } from '../services/index.service';
import { any } from 'joi'; 
import { roomSchema } from '../models/room.model';


class RoomController {
    async createRoom(req: Request, res: Response): Promise<Response> {
        try {
            const { name, roomType, price, deleted: boolean }: { name: string, roomType: string, price: number, deleted: boolean } = req.body;

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

        
            const createdRoom = await roomService.create({ name, roomType, price });

            return res.status(201).json({ 
                message: 'Room created successfully', 
                data: createdRoom 
            });

        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ 
                success: false,
                message: error.message 
            });
        }
    }

    async getRoomsByFilter(req: Request, res: Response): Promise<Response> {
        try {
            const name: string = req.query.search?.toString() || '';
            const roomTypeName: string = req.query.roomType?.toString() || '';
            const minPrice: number = parseInt(req.query.minPrice?.toString() || '0');
            const maxPrice: number = parseInt(req.query.maxPrice?.toString() || '0');
            const query: any = {};

            if (name) {
                query.name = name;
            }

            if (roomTypeName) {
                query['roomType.name'] = roomTypeName; // Assuming a nested structure for roomType
            }

            if (minPrice && maxPrice) {
                query.price = { $gte: minPrice, $lte: maxPrice };
            } else if (minPrice) {
                query.price = { $gte: minPrice };
            } else if (maxPrice) {
                query.price = { $lte: maxPrice };
            }

            const rooms = await roomService.search(query);
            return res.status(200).json({ 
                success: true,
                message: 'Rooms fetched successfully',
                data: rooms
            });

        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ 
                success: false,
                message: error.message 
            });
        }
    }

    async getARoom(req: Request, res: Response): Promise<Response> {
        try {
            const room = await roomService.find(req.params.id as any) ;
            if (room === null) {  
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

        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ 
                success: false,
                message: error.message 
            });
        }
    }


    async updateRoom(req: Request, res: Response): Promise<Response> {
      try {
          const { name, price, roomType }: { name?: string, price?: number, roomType?: string } = req.body;

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

          const data: Partial<Room> = {}; 
          if (name) {
              data.name = name;
          } 
          if (price) {
              data.price = price;
          } 
          if (roomType) {
              data.roomType = isExistingRoomType._id;
          } 

          const updatedRoom = await roomService.update(req.params.id as any, data);

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

      } catch (error: any) {
          console.error(error);
          return res.status(500).json({ 
              success: false,
              message: error.message // Consider more specific error handling
          });
      }
  }

  async deleteRoom(req: Request, res: Response): Promise<Response> {
    try {
        const room = await roomService.delete(req.params.id as any);
        if (room === null) {
            const errorMessage = 'Room not found';
            console.error(errorMessage);
            return res.status(404).json({
                success: false,
                message: errorMessage
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
            message: 'Room deleted successfully',
            data: deletedRoom 
        });

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
  }
}


export default new RoomController();
