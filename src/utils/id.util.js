import { isValidObjectId } from "mongoose";
import { logger } from "./logger.js";

export default (id, helpers)=> {
  if (!isValidObjectId(id)) {
    logger.error("Invalid Object Id");
    return helpers.error("Invalid Object Id");
  }

  return id;
}