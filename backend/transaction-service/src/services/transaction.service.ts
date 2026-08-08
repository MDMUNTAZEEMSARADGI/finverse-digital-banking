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
          userId: account.userId,

          type: "DEPOSIT",

          title: "Deposit Successful",

          message: `₹${amount} deposited successfully`,

          metadata: {
            transactionId: transaction.id,
            accountId,
            amount,
          },
        }),
      },
    ],
  });

  return transaction;
};

export const withdrawMoney = async (accountId: string, amount: number) => {
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

  if (account.balance < amount) {
    throw new Error("Insufficient balance");
  }

  await axios.patch(
    `${process.env.ACCOUNT_SERVICE_URL}/api/accounts/internal/${accountId}/withdraw`,
    {
      amount,
    },
  );

  const transaction = await prisma.transaction.create({
    data: {
      accountId,
      amount,
      type: "WITHDRAW",
      status: "SUCCESS",
      reference: crypto.randomUUID(),
    },
  });

  await producer.send({
    topic: "transaction.created",
    messages: [
      {
        value: JSON.stringify({
          userId: account.userId,

          type: "WITHDRAW",

          title: "Withdrawal Successful",

          message: `₹${amount} withdrawn successfully`,

          metadata: {
            transactionId: transaction.id,
            accountId,
            amount,
          },
        }),
      },
    ],
  });

  return transaction;
};

export const transferMoney = async (
  fromAccountId: string,
  toAccountId: string,
  amount: number,
) => {
  if (fromAccountId === toAccountId) {
    throw new Error("Cannot transfer to same account");
  }

  const senderResponse = await axios.get(
    `${process.env.ACCOUNT_SERVICE_URL}/api/accounts/internal/${fromAccountId}`,
  );

  const receiverResponse = await axios.get(
    `${process.env.ACCOUNT_SERVICE_URL}/api/accounts/internal/${toAccountId}`,
  );

  const sender = senderResponse.data.account;

  const receiver = receiverResponse.data.account;

  if (!sender) {
    throw new Error("Sender account not found");
  }

  if (!receiver) {
    throw new Error("Receiver account not found");
  }

  if (sender.status !== "ACTIVE") {
    throw new Error("Sender account inactive");
  }

  if (receiver.status !== "ACTIVE") {
    throw new Error("Receiver account inactive");
  }

  if (sender.balance < amount) {
    throw new Error("Insufficient balance");
  }

  await axios.patch(
    `${process.env.ACCOUNT_SERVICE_URL}/api/accounts/internal/${fromAccountId}/withdraw`,
    {
      amount,
    },
  );

  await axios.patch(
    `${process.env.ACCOUNT_SERVICE_URL}/api/accounts/internal/${toAccountId}/deposit`,
    {
      amount,
    },
  );

  const transaction = await prisma.transaction.create({
    data: {
      accountId: fromAccountId,
      receiverAccountId: toAccountId,
      amount,
      type: "TRANSFER",
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
          fromAccountId,
          toAccountId,
          amount,
          type: "TRANSFER",
        }),
      },
    ],
  });

  return transaction;
};

export const getTransactionHistory = async (userId: string) => {
  const response = await axios.get(
    `${process.env.ACCOUNT_SERVICE_URL}/api/accounts/internal/user/${userId}`,
  );

  const accounts = response.data.accounts;

  const accountIds = accounts.map((a: any) => a.id);

  return prisma.transaction.findMany({
    where: {
      OR: [
        {
          accountId: {
            in: accountIds,
          },
        },
        {
          receiverAccountId: {
            in: accountIds,
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getTransactionById = async (id: string) => {
  const transaction = await prisma.transaction.findUnique({
    where: {
      id,
    },
  });

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  return transaction;
};
