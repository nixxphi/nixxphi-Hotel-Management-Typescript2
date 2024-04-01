import { logger } from '../utils/logger.js';

export default (error, req, res, next) => {
  logger.error(error);

  return res.status(500).json({
    success: false,
    message: error.message
  });
};