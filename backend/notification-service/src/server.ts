import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import { startConsumer } from "./kafka/consumer";

const PORT = process.env.PORT || 5005;

const start = async () => {
  await connectDB();

  await startConsumer();

  app.listen(PORT, () => {
    console.log(`Notification Service running on ${PORT}`);
  });
};

start();
