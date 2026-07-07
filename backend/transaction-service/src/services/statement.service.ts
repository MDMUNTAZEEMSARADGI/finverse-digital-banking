import axios from "axios";
import prisma from "../config/prisma";

export const getAccountStatement = async (accountId: string) => {
  // Fetch account details from Account Service
  const accountResponse = await axios.get(
    `${process.env.ACCOUNT_SERVICE_URL}/api/accounts/internal/${accountId}`,
  );

  const account = accountResponse.data.account;

  if (!account) {
    throw new Error("Account not found");
  }

  // Fetch all transactions related to this account
  const transactions = await prisma.transaction.findMany({
    where: {
      OR: [
        {
          accountId,
        },
        {
          receiverAccountId: accountId,
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Calculate summary
  const totalDeposits = transactions
    .filter((t) => t.type === "DEPOSIT")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawals = transactions
    .filter((t) => t.type === "WITHDRAW")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalTransfers = transactions
    .filter((t) => t.type === "TRANSFER")
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    account,
    summary: {
      transactionCount: transactions.length,
      totalDeposits,
      totalWithdrawals,
      totalTransfers,
      currentBalance: account.balance,
    },
    transactions,
  };
};
