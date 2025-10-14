import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "node:path";
import { logger } from "./core/logger.js";
import { routes } from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// se for usar proxy (Render, Vercel, etc.)
app.set("trust proxy", 1);

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));


// *** CORS ***
const ALLOWED_ORIGINS = (process.env.CORS_ORIGIN?.split(",") ?? [
  "http://localhost:5173",
]) as (string | RegExp)[];

app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// responde preflight
app.options(
  "*",
  cors({
    origin: ALLOWED_ORIGINS,
    credentials: true,
  })
);

app.use(express.json());

// servir uploads (para imagens funcionarem no front)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// rotas da API
app.use("/api", routes);

// handler de erro por último
app.use(errorHandler);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
