import { GenericService } from './generic.service'
import { User } from '../models/user.model';
import { Room } from '../models/room.model';
import { RoomType } from '../models/roomType.model';

export const userService = new GenericService<User>(User);
export const roomService = new GenericService<Schema>(Room);
export const roomTypeService = new GenericService<RoomType>(RoomType);