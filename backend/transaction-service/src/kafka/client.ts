// import { Kafka } from "kafkajs";
// import fs from "fs";
// import path from "path";

// const caPath = path.join(process.cwd(), "certs", "ca.pem");

// export const kafka = new Kafka({
//   clientId: "finverse",

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

import { Kafka } from "kafkajs";

const ca = process.env.KAFKA_CA_CERT?.replace(/\\n/g, "\n");

export const kafka = new Kafka({
  clientId: "finverse",

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