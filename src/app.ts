import express, { Request, Response, NextFunction} from 'express'; 
import mainMiddleware from "./middlewares/main.middleware"
import errorHandler from "./configs/constants.config"

const app = express();
app.use(errorHandler);
mainMiddleware(app)

export default app;