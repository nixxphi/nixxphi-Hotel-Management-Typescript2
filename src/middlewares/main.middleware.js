import express from "express"
import morgan from "morgan"
import cors from "cors"
import helmet from "helmet"
import cookieParser from "cookie-parser"

import config from "../configs/constants.config.js"
import errorHandler from "./errors.middleware.js"
import mainRoute from "../routes/main.route.js"


import "../configs/db.config.js";

export default (app) => {
    app.use(morgan("common"));
    app.use(cors());
    app.use(helmet());
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    mainRoute(app);
    app.use(config.PAGENOTFOUND)
    app.use(errorHandler);
};