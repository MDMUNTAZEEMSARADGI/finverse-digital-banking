import { consumer } from "./test-consumer";

async function run() {
  await consumer.connect();

  await consumer.subscribe({
    topic: "test-topic",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log(message.value?.toString());
    },
  });
}

run();
