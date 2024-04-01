import express from "express"
import mainMiddleware from "./middlewares/main.middleware.js"

const app = express();

mainMiddleware(app)

export default app;