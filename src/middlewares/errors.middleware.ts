import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

interface CustomError extends Error {
  message: string;
  status?: number;
}

const errorMiddleware = (error: CustomError, req: Request, res: Response, next: NextFunction): Response => {
  logger.error(error);

  const status = error.status || 500; 
  const message = error.message || 'Internal Server Error'; 

  return res.status(status).json({
    success: false,
    message: message
  });
};

export default errorMiddleware;
