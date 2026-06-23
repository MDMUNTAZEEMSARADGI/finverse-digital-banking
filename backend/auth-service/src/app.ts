import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/health", (_, res) => {
  res.json({
    success: true,
    service: "auth-service",
  });
});

export default app;
