import { Request, Response, NextFunction } from 'express';
import { verifyToken, checkTokenValidity } from '../utils/token.util.ts';
import { userService } from '../services/index.service.ts';

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const authHeaders = req.header('Authorization');
  const token =
    authHeaders && authHeaders.substring(0, 7) === 'Bearer '
      ? authHeaders.replace('Bearer ', '')
      : req.cookies?.token;

  if (!token) {
    return res.status(404).json({
      success: false,
      message: 'Login to continue',
    });
  }

  // Extracts the expiration date from the token available
  const isValidToken = await checkTokenValidity(token);
  if (!isValidToken) {
    return res.status(404).json({
      success: false,
      message: 'Session expired. Sign in again to continue.',
    });
  }

  // Decode the user token to get user credentials
  const decoded = await verifyToken(token);
  const user = await userService.find({
    _id: decoded._id,
    deleted: false
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  req.user = user;
  next();
};
