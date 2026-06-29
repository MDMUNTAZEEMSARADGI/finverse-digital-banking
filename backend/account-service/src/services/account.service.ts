import axios from "axios";
import prisma from "../config/prisma";
import { generateAccountNumber } from "../utils/accountNumber";

const verifyKyc = async (userId: string, token: string) => {
  const response = await axios.get(
    `${process.env.KYC_SERVICE_URL}/api/kyc/me`,
    {
      headers: {
        Authorization: token,
      },
    },
  );

  return response.data.kyc;
};

export const createAccount = async (
  userId: string,
  type: "SAVINGS" | "CURRENT",
  token: string,
) => {
  const kyc = await verifyKyc(userId, token);

  if (kyc.status !== "APPROVED") {
    throw new Error("KYC not approved");
  }

  const existing = await prisma.account.findFirst({
    where: {
      userId,
      status: "ACTIVE",
    },
  });

  if (existing) {
    throw new Error("Account already exists");
  }

  const accountNumber = generateAccountNumber();

  return prisma.account.create({
    data: {
      userId,
      type,
      accountNumber,
      ifscCode: "FINV0001001",
    },
  });
};

export const getMyAccounts = async (userId: string) => {
  return prisma.account.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// Get single account
export const getAccount = async (id: string, userId: string) => {
  const account = await prisma.account.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!account) {
    throw new Error("Account not found");
  }

  return account;
};

// /api/accounts/balance/:id
export const getBalance = async (id: string, userId: string) => {
  const account = await getAccount(id, userId);

  return {
    balance: account.balance,
  };
};

// Freeze Account (Admin)
export const freezeAccount = async (id: string) => {
  return prisma.account.update({
    where: {
      id,
    },
    data: {
      status: "FROZEN",
    },
  });
};

//c;lose account
export const closeAccount = async (id: string) => {
  return prisma.account.update({
    where: {
      id,
    },
    data: {
      status: "CLOSED",
    },
  });
};

//internal deposite
export const deposit = async (id: string, amount: number) => {
  return prisma.account.update({
    where: {
      id,
    },
    data: {
      balance: {
        increment: amount,
      },
    },
  });
};

//withdraw in transaction
export const withdraw =
  async (
    id: string,
    amount: number
  ) => {
    const account =
      await prisma.account.findUnique({
        where: {
          id,
        },
      });

    if (!account) {
      throw new Error(
        "Account not found"
      );
    }

    if (
      account.balance <
      amount
    ) {
      throw new Error(
        "Insufficient balance"
      );
    }

    return prisma.account.update({
      where: {
        id,
      },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });
  };

// internal authorization
export const getAccountById = async (id: string) => {
  const account = await prisma.account.findUnique({
    where: {
      id,
    },
  });

  if (!account) {
    throw new Error("Account not found");
  }

  return account;
};
