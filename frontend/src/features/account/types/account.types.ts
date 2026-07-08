export type AccountType =
  | "SAVINGS"
  | "CURRENT"
  | "FIXED_DEPOSIT";

export type AccountStatus =
  | "ACTIVE"
  | "FROZEN"
  | "CLOSED";

export interface Account {
  id: string;
  accountNumber: string;
  accountType: AccountType;
  balance: number;
  status: AccountStatus;
  createdAt: string;
}

export interface OpenAccountRequest {
  accountType: AccountType;
}

export interface OpenAccountResponse {
  success: boolean;
  account: Account;
}

export interface GetAccountsResponse {
  success: boolean;
  accounts: Account[];
}