import GenericService from './generic.service';
import User from '../models/user.model';
import Room from '../models/room.model';
import RoomType from '../models/roomType.model';

export const userService = new GenericService<any>(User);
export const roomService = new GenericService<any>(Room);
export const roomTypeService = new GenericService<any>(RoomType);