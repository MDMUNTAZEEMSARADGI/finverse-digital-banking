export type NotificationType =
  | "DEPOSIT"
  | "WITHDRAW"
  | "TRANSFER"
  | "ACCOUNT"
  | "KYC"
  | "SYSTEM";

export interface NotificationEvent {
  userId: string;

  type: NotificationType;

  title: string;

  message: string;

  metadata?: Record<string, unknown>;
}