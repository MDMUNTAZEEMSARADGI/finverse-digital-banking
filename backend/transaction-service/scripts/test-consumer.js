"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const producer_1 = require("../src/kafka/producer");
async function run() {
    await producer_1.producer.connect();
    await producer_1.producer.send({
        topic: "test-topic",
        messages: [
            {
                value: "Hello Kafka",
            },
        ],
    });
    console.log("Message Sent");
    await producer_1.producer.disconnect();
}
run();
