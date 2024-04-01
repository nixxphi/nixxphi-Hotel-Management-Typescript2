import roomRouter from "./room.route";
import roomTypeRouter from "./roomType.route";
import userRouter from "./user.route";

const apiVersion = '/api/v1'
export default (app: any) => {
  app.use(`${apiVersion}/rooms`, roomRouter);
  app.use(`${apiVersion}/room-types`, roomTypeRouter);
  app.use(`${apiVersion}/users`, userRouter);
};