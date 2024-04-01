import { Router } from 'express'; 
import roomController from '../controllers/room.controller.js';
import validate from '../middlewares/validate.middleware.js';
import { CreateRoomSchema } from '../validations/room.validation.js';

// CREATE A NEW ROUTER INSTANCE
const roomRouter = Router();

// POST endpoint for creating a new room
roomRouter.post('/', validate(CreateRoomSchema), roomController.createRoom);

// GET endpoint for fetching all rooms
roomRouter.get('/', roomController.getRoomsByFilter);

// GET endpoint for fetching a single room by ID
roomRouter.get('/:id', roomController.getARoom);

// PATCH endpoint for updating a room by ID
roomRouter.patch('/:id', roomController.updateRoom);

// DELETE endpoint for deleting a room by ID
roomRouter.delete('/:id', roomController.deleteRoom);

export default roomRouter;