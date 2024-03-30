import { Router } from 'express';
import roomTypeController from '../controllers/roomType.controller';
import authenticate from '../middlewares/authenticate.middleware';
import validate from '../middlewares/validate.middleware';
import authorizeAdmin from '../middlewares/authorize.middleware';
import { CreateRoomTypeSchema, EditRoomTypeSchema } from '../validations/roomType.validation';

const roomTypeRouter = Router();

// POST endpoint for creating a new room type
roomTypeRouter.post('/', authenticate, validate(CreateRoomTypeSchema),
  roomTypeController.createRoomType
);

// GET endpoint for fetching all room types
roomTypeRouter.get('/', roomTypeController.getAllRoomTypes);

// GET endpoint for getting a room type by ID
roomTypeRouter.get('/:id', authenticate, roomTypeController.getARoomType);

// PATCH endpoint for updating a room type by ID
roomTypeRouter.patch('/:id', authenticate, authorizeAdmin, validate(EditRoomTypeSchema), roomTypeController.updateRoomType);

// DELETE endpoint for deleting a room type by ID
roomTypeRouter.delete('/:id', roomTypeController.deleteRoomType);

export default roomTypeRouter;
