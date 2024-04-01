import { isValidObjectId } from "mongoose";
import { logger } from "./logger.js";

/**
 * @param id 
 * @param helpers
 * @returns 
 */
export default function validateObjectId(id: string, helpers: { error: (message: string) => any }): string | string {
  if (!isValidObjectId(id)) {
    logger.error("Invalid Object Id");
    return helpers.error("Invalid Object Id");
  }

  return id;
}
