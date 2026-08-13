import type { LucideIcon } from "lucide-react";

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

export interface AccountCardProps {
  accountType: Account["accountType"];
  accountNumber: string;
  balance: number;
  status: Account["status"];
}

export interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  change?: string;
}