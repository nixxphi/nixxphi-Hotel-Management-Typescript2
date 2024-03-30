import express from "express";
import mainMiddleware from "./middlewares/main.middleware.ts";

const app = express();

mainMiddleware(app);

export default app;
