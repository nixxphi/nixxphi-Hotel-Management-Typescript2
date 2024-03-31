"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const room_route_1 = __importDefault(require("./room.route"));
const roomType_route_1 = __importDefault(require("./roomType.route"));
const user_route_1 = __importDefault(require("./user.route"));
const apiVersion = '/api/v1';
exports.default = (app) => {
    app.use(`${apiVersion}/rooms`, room_route_1.default);
    app.use(`${apiVersion}/room-types`, roomType_route_1.default);
    app.use(`${apiVersion}/users`, user_route_1.default);
};
