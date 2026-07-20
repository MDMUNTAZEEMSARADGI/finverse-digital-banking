import { producer } from "./producer";


export const publishTransactionCreated =
  async (event: object) => {

    await producer.send({

      topic: "transaction.created",

      messages: [
        {
          value: JSON.stringify(event),
        },
      ],

    });

};