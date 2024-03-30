import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import config from "../configs/constants.config";
import errorHandler from "./errors.middleware";
import mainRoute from "../routes/main.route";

import "../configs/db.config";

export default (app: Express): void => {
    app.use(morgan("common"));
    app.use(cors());
    app.use(helmet());
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    mainRoute(app);
    app.use(config.PAGENOTFOUND);
    app.use(errorHandler);
};
