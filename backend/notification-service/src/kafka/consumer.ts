import { kafka } from "./client";

import { createNotification } from "../services/notification.service";

import type { NotificationEvent } from "../types/notification.types";

export const startConsumer = async () => {
  const consumer = kafka.consumer({
    groupId: "notification-group",
  });

  await consumer.connect();

  await consumer.subscribe({
    topic: "transaction.created",
    fromBeginning: true,
  });

  console.log("Notification Consumer Connected");

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        if (!message.value) return;

        const event = JSON.parse(
          message.value.toString()
        ) as NotificationEvent;

        console.log("Received Event:", event);

        await createNotification(event);

        console.log("Notification Saved");
      } catch (error) {
        console.error(error);
      }
    },
  });
};