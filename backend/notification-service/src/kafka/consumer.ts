import { kafka } from "./client";

import { createNotification } from "../services/notification.service";

import type {
  NotificationEvent
} from "../types/notification.types";


export const startConsumer = async () => {

  const consumer = kafka.consumer({
    groupId:"notification-group",
  });


  await consumer.connect();


  await consumer.subscribe({
    topic:"transaction.created",
    fromBeginning:true,
  });


  console.log(
    "Notification Consumer Connected"
  );


  await consumer.run({

    eachMessage: async ({message})=>{


      if(!message.value){
        return;
      }


      const event =
        JSON.parse(
          message.value.toString()
        ) as NotificationEvent;


      await createNotification(event);


      console.log(
        "Notification Saved"
      );

    }

  });

};