import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "Auth Service Running",
  });
});

app.use("/api", routes);


export default app;
