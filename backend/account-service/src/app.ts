import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import accountRoutes from "./routes/account.routes";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://finverse-phi.vercel.app/",
    ],
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "Account Service Running",
    service: "account-service",
  });
});


app.use(
  "/api/accounts",
  accountRoutes
);

export default app;
