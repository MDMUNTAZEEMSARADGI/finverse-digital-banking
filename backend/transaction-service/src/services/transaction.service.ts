import axios from "axios";
import crypto from "crypto";
import prisma from "../config/prisma";
import { producer } from "../kafka/producer";

export const depositMoney = async (accountId: string, amount: number) => {
  const response = await axios.get(
    `${process.env.ACCOUNT_SERVICE_URL}/api/accounts/internal/${accountId}`,
  );

  const account = response.data.account;

  if (!account) {
    throw new Error("Account not found");
  }

  if (account.status !== "ACTIVE") {
    throw new Error("Account is not active");
  }

  await axios.patch(
    `${process.env.ACCOUNT_SERVICE_URL}/api/accounts/internal/${accountId}/deposit`,
    {
      amount,
    },
  );

  const transaction = await prisma.transaction.create({
    data: {
      accountId,
      amount,
      type: "DEPOSIT",
      status: "SUCCESS",
      reference: crypto.randomUUID(),
    },
  });

  await producer.send({
    topic: "transaction.created",
    messages: [
      {
        value: JSON.stringify({
          transactionId: transaction.id,
          accountId,
          amount,
          type: "DEPOSIT",
        }),
      },
    ],
  });

  return transaction;
};

export const withdrawMoney = async (
  accountId: string,
  amount: number
) => {
  const response =
    await axios.get(
      `${process.env.ACCOUNT_SERVICE_URL}/api/accounts/internal/${accountId}`
    );

  const account =
    response.data.account;

  if (!account) {
    throw new Error(
      "Account not found"
    );
  }

  if (
    account.status !== "ACTIVE"
  ) {
    throw new Error(
      "Account is not active"
    );
  }

  if (
    account.balance < amount
  ) {
    throw new Error(
      "Insufficient balance"
    );
  }

  await axios.patch(
    `${process.env.ACCOUNT_SERVICE_URL}/api/accounts/internal/${accountId}/withdraw`,
    {
      amount,
    }
  );

  const transaction =
    await prisma.transaction.create({
      data: {
        accountId,
        amount,
        type: "WITHDRAW",
        status: "SUCCESS",
        reference:
          crypto.randomUUID(),
      },
    });

  await producer.send({
    topic:
      "transaction.created",
    messages: [
      {
        value: JSON.stringify({
          transactionId:
            transaction.id,
          accountId,
          amount,
          type:
            "WITHDRAW",
        }),
      },
    ],
  });

  return transaction;
};