import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { logger } from "./core/logger.js";
import { routes } from "./routes/index.js";
import path from "node:path";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api', routes)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/health", (_req, res) => res.json({ status: "ok" }));

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});