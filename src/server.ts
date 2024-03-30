import "express-async-errors";
import app from "./app";
import { logger } from "./utils/logger";

const PORT: string | number | undefined = process.env.PORT;

app.listen(PORT, () => {
  logger.info(`listening on port ${PORT}`);
});
