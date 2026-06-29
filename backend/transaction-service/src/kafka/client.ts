import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "finverse",
  brokers: ["localhost:9092"],
});
