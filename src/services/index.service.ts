import GenericService from "./generic.service.ts";
import User from "../models/user.model.ts";
import Room from "../models/room.model.ts";
import RoomType from "../models/roomType.model.ts";

export const roomService = new GenericService(Room);
export const roomTypeService = new GenericService(RoomType);
export const userService = new GenericService(User);
