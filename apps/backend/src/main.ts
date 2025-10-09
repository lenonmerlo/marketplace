import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { logger } from "./core/logger.js";
import { routes } from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: '*', credentials: true }))
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);;



app.get("/health", (_req, res) => res.json({ status: "ok" }));

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});