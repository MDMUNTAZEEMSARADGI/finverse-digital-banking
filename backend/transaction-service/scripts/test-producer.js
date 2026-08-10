"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_consumer_1 = require("./test-consumer");
async function run() {
    await test_consumer_1.consumer.connect();
    await test_consumer_1.consumer.subscribe({
        topic: "test-topic",
        fromBeginning: true,
    });
    await test_consumer_1.consumer.run({
        eachMessage: async ({ message }) => {
            console.log(message.value?.toString());
        },
    });
}
run();
