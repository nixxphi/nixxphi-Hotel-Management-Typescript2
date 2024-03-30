import Express from "express";
import mainMiddleware from "./middlewares/main.middleware";

const app = Express();

mainMiddleware(app);

export default app;
