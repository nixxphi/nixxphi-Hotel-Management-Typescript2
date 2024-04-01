import { verifyToken, checkTokenValidity } from '../utils/token.util';
import { userService } from '../services/index.service';
import { Request, Response, NextFunction } from 'express';

export default async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers['authorization'];
    const token =
      authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.slice(7)
        : req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Please login to continue.',
      });
    }

    // Check token validity
    const isValidToken = await checkTokenValidity(token);
    if (!isValidToken) {
      return res.status(401).json({
        success: false,
        message: 'Session expired. Sign in again to continue.',
      });
    }

    // Decode user token and find user
    const decoded = await verifyToken(token);
    const user = await userService.find({
      _id: decoded?._Id,
      deleted: false,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.',
    });
  }
}
