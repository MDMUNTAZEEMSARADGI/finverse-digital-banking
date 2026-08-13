// FOR Render
import { Kafka } from "kafkajs";

const ca = process.env.KAFKA_CA_CERT?.replace(/\\n/g, "\n");

export const kafka = new Kafka({
  clientId: "notification-service",

  brokers: [process.env.KAFKA_BROKER!],

  ssl: {
    ca: [ca!],
  },

  sasl: {
    mechanism: "scram-sha-256",
    username: process.env.KAFKA_USERNAME!,
    password: process.env.KAFKA_PASSWORD!,
  },
});

console.log("KAFKA_BROKER:", process.env.KAFKA_BROKER);
console.log("KAFKA_USERNAME:", process.env.KAFKA_USERNAME);
console.log("KAFKA_CA_CERT exists:", !!process.env.KAFKA_CA_CERT);

// import { Kafka } from "kafkajs";
// import fs from "fs";
// import path from "path";

// const caPath = path.join(process.cwd(), "certs", "ca.pem");

// export const kafka = new Kafka({
//   clientId: "notification-service",

//   brokers: [process.env.KAFKA_BROKER!],

//   ssl: {
//     ca: [fs.readFileSync(caPath, "utf-8")],
//   },

//   sasl: {
//     mechanism: "scram-sha-256",
//     username: process.env.KAFKA_USERNAME!,
//     password: process.env.KAFKA_PASSWORD!,
//   },
// });
