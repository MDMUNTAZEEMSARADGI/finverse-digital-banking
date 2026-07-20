import express from "express";

import notificationRoutes from "./routes/notification.routes";

const app = express();


app.use(express.json());


// Notification APIs
app.use(
  "/api/notifications",
  notificationRoutes
);


export default app;