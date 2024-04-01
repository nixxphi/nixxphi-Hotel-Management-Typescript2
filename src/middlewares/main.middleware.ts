import express from "express"
import morgan from "morgan"
import cors from "cors"
import helmet from "helmet"
import cookieParser from "cookie-parser"

import PAGENOTFOUND from "../configs/constants.config"
import errorHandler from "./errors.middleware"
import mainRoute from "../routes/main.route"


import "../configs/db.config.js";

export default (app:any) => {
    app.use(morgan("common"));
    app.use(cors());
    app.use(helmet());
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    mainRoute(app);
    app.use(PAGENOTFOUND)
    app.use(errorHandler);
};