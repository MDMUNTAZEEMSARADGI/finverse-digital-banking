import type { LucideIcon } from "lucide-react";

export interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  change?: string;
}

export interface AccountCardProps {
  accountType: string;
  accountNumber: string;
  balance: string;
  status: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: "DEPOSIT" | "WITHDRAW" | "TRANSFER";
  amount: number;
  status: "SUCCESS" | "PENDING" | "FAILED";
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}