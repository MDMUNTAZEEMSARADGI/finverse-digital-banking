import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import transactionRoutes from "./routes/transaction.routes";
import statementRoutes from "./routes/statement.routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({
    success: true,
    service: "transaction-service",
  });
});

app.use("/api/transactions", transactionRoutes);

app.use("/api/statements", statementRoutes);

export default app;
