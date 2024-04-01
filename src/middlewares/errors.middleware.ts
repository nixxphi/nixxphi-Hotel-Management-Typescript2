import express, { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';

class CustomError extends Error {
  statusCode?: number; 
}


export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  
  console.error(err.stack || err.message); 

  let statusCode = 500; 

  if (err instanceof CustomError && err.statusCode) {
    statusCode = err.statusCode; 
  } else if (err.name === 'ValidationError') { 
    statusCode = 400; // Bad Request
  } else if (err.name === 'UnauthorizedError') { 
    statusCode = 401; // Unauthorized
  }

  res.status(statusCode).json({ message: err.message });
}
