import "express-async-errors";
import app from "./app.ts";
import { logger } from "./utils/logger.ts";

const PORT: string | number | undefined = process.env.PORT;

app.listen(PORT, () => {
  logger.info(`listening on port ${PORT}`);
});
