import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction): void => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. You are not authorized to perform this action.' });
  }
  next();
};
