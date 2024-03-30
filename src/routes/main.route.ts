import { Express } from 'express';
import roomRouter from './room.route.ts';
import roomTypeRouter from './roomType.route.ts';
import userRouter from './user.route.ts';

const apiVersion = '/api/v1';

export default (app: Express): void => {
  app.use(`${apiVersion}/rooms`, roomRouter);
  app.use(`${apiVersion}/room-types`, roomTypeRouter);
  app.use(`${apiVersion}/users`, userRouter);
};
