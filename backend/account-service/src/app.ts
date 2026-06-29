import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import accountRoutes from "./routes/account.routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({
    success: true,
    service: "account-service",
  });
});


app.use(
  "/api/accounts",
  accountRoutes
);

export default app;
