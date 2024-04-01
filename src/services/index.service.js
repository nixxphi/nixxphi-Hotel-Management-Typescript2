import GenericService from "./generic.service.js";
import User from "../models/user.model.js";
import Room from "../models/room.model.js";
import RoomType from "../models/roomType.model.js";

export const roomService = new GenericService(Room)
export const roomTypeService = new GenericService(RoomType)
export const userService = new GenericService(User)