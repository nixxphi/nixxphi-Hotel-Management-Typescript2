import { isValidObjectId } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { logger } from "./logger";

export default (id: string, helpers: { error: (message: string) => Response }): string => {
    if (!isValidObjectId(id)) {
        logger.error("Invalid Object Id");
        return helpers.error("Invalid Object Id").toString();
    }

    return id;
};
