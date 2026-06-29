import { producer } from "../src/kafka/producer";

async function run() {
  await producer.connect();

  await producer.send({
    topic: "test-topic",
    messages: [
      {
        value: "Hello Kafka",
      },
    ],
  });

  console.log("Message Sent");

  await producer.disconnect();
}

run();
