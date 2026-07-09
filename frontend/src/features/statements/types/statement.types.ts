export interface Account {
  id: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  status: string;
}

export interface StatementSummary {
  transactionCount: number;
  totalDeposits: number;
  totalWithdrawals: number;
  totalTransfers: number;
  currentBalance: number;
}

export interface StatementTransaction {
  id: string;
  accountId: string;
  receiverAccountId?: string | null;
  amount: number;
  type: "DEPOSIT" | "WITHDRAW" | "TRANSFER";
  status: string;
  reference: string;
  createdAt: string;
}

export interface Statement {
  account: Account;
  summary: StatementSummary;
  transactions: StatementTransaction[];
}

export interface StatementResponse {
  success: boolean;
  statement: Statement;
}
