import type { Account } from "../../account/types/account.types";
import type { Transaction } from "../../transaction/types/transaction.types";
import type { Notification } from "../../notification/types/notification.types";
import type { Kyc } from "../../kyc/types/kyc.types";

export interface DashboardData {
  accounts: Account[];
  transactions: Transaction[];
  notifications: Notification[];
  kyc: Kyc | null;
  totalBalance: number;
}