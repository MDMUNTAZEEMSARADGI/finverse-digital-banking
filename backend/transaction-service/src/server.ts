import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectProducer } from "./kafka/producer";

const PORT =
  process.env.PORT || 5004;

async function start() {
  await connectProducer();

  app.listen(PORT, () => {
    console.log(
      `Transaction Service running on ${PORT}`
    );
  });
}

start();