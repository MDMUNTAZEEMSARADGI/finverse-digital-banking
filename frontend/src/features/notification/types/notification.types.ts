export type NotificationType =
  | "DEPOSIT"
  | "WITHDRAW"
  | "TRANSFER"
  | "ACCOUNT"
  | "KYC"
  | "SYSTEM";


export interface Notification {
  id: string;

  userId: string;

  type: NotificationType;

  title: string;

  message: string;

  status: "UNREAD" | "READ";

  metadata?: Record<string, unknown>;

  createdAt: string;

  updatedAt: string;
}


export interface NotificationResponse {
  success: boolean;

  notifications: Notification[];
}