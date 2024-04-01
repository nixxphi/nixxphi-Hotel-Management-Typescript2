import { Request, Response, NextFunction } from "express";
import User from '../models/user.model'

export default (req:Request, res: Response, next: NextFunction) => {
  let user = new User
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. You are not authorized to perform this action.' });
  }
  next();
};