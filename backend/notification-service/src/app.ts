import express from "express";
import cors from "cors";

import notificationRoutes from "./routes/notification.routes";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://finverse-phi.vercel.app/"],
    credentials: true,
  }),
);
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({
    success: true,
    service: "notification-service",
  });
});

app.use("/api/notifications", notificationRoutes);

export default app;
