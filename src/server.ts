import "express-async-errors";
import app from "./app";
import { logger } from "./utils/logger.js";

const PORT = process.env.PORT|| 3000;

app.listen(PORT, () => {
  logger.info(`listening on port ${PORT}`);
});