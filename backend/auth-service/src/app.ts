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
    message: "Auth Service Running dfsdf",
  });
});

app.get("/test", (_re, res) => {
  res.json({
    success: true,
    message: "testasdasf",
  });
});
app.use("/api", routes);

// app.post("/api/auth/login", (req, res) => {
//   res.send("della");
// });

export default app;
