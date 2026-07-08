import api from "../../../api/axios";

import type {
  DepositRequest,
  WithdrawRequest,
  TransferRequest,
  TransactionResponse,
  TransactionHistoryResponse,
} from "../types/transaction.types";

export const deposit = async (
  data: DepositRequest,
): Promise<TransactionResponse> => {
  const response = await api.post("/transactions/deposit", data);

  return response.data;
};

export const withdraw = async (
  data: WithdrawRequest,
): Promise<TransactionResponse> => {
  const response = await api.post("/transactions/withdraw", data);

  return response.data;
};

export const transfer = async (
  data: TransferRequest,
): Promise<TransactionResponse> => {
  const response = await api.post("/transactions/transfer", data);

  return response.data;
};

export const getTransactions =
  async (): Promise<TransactionHistoryResponse> => {
    const response = await api.get("/transactions/history");

    return response.data;
  };

export const getTransaction = async (
  id: string,
): Promise<TransactionResponse> => {
  const response = await api.get(`/transactions/${id}`);

  return response.data;
};
