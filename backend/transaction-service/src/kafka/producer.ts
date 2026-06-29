import { kafka } from "./client";

export const producer = kafka.producer();

export const connectProducer = async () => {
  await producer.connect();

  console.log("Kafka Producer Connected");
};
