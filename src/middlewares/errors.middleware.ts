import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.ts';

export default (error: Error, req: Request, res: Response, next: NextFunction): Response => {
  logger.error(error);

  return res.status(500).json({
    success: false,
    message: error.message
  });
};
