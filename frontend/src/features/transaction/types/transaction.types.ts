export type TransactionType =
  | "DEPOSIT"
  | "WITHDRAW"
  | "TRANSFER";

export type TransactionStatus =
  | "SUCCESS"
  | "PENDING"
  | "FAILED";

export interface Transaction {
  id: string;
  accountId: string;
  receiverAccountId?: string;

  amount: number;

  type: TransactionType;

  status: TransactionStatus;

  reference: string;

  createdAt: string;
}

export interface DepositRequest {
  accountId: string;
  amount: number;
}

export interface WithdrawRequest {
  accountId: string;
  amount: number;
}

export interface TransferRequest {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
}

export interface TransactionResponse {
  success: boolean;
  transaction: Transaction;
}

export interface TransactionHistoryResponse {
  success: boolean;
  transactions: Transaction[];
}