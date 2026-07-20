import {
  Bell,
  ArrowDownCircle,
  ArrowUpCircle,
  Repeat,
  Building2,
  ShieldAlert,
  BadgeCheck,
} from "lucide-react";

import type { Notification } from "../types/notification.types";

interface NotificationCardProps {
  notification: Notification;

  onRead?: (id: string) => void;

  onDelete?: (id: string) => void;
}

const NotificationCard = ({
  notification,
  onRead,
  onDelete,
}: NotificationCardProps) => {
  const getIcon = () => {
    switch (notification.type) {
      case "DEPOSIT":
        return <ArrowDownCircle className="text-green-600" size={22} />;

      case "WITHDRAW":
        return <ArrowUpCircle className="text-red-600" size={22} />;

      case "TRANSFER":
        return <Repeat className="text-blue-600" size={22} />;

      case "ACCOUNT":
        return <Building2 className="text-purple-600" size={22} />;

      case "KYC":
        return <BadgeCheck className="text-green-600" size={22} />;

      case "SYSTEM":
        return <ShieldAlert className="text-yellow-600" size={22} />;

      default:
        return <Bell className="text-gray-600" size={22} />;
    }
  };

  return (
    <div
      className={`flex items-start justify-between rounded-xl border p-4 shadow-sm transition ${
        notification.status === "UNREAD"
          ? "border-blue-300 bg-blue-50"
          : "bg-white"
      }`}
    >
      <div className="flex gap-4">
        {getIcon()}

        <div>
          <h3 className="font-semibold">{notification.title}</h3>

          <p className="mt-1 text-sm text-gray-600">{notification.message}</p>

          {typeof notification.metadata?.amount === "number" && (
            <p className="mt-1 text-xs text-gray-500">
              Amount: ₹{notification.metadata.amount}
            </p>
          )}

          <p className="mt-2 text-xs text-gray-400">
            {new Date(notification.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        {notification.status === "UNREAD" && (
          <button
            onClick={() => onRead?.(notification.id)}
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
          >
            Read
          </button>
        )}

        <button
          onClick={() => {
            const confirmDelete = window.confirm("Delete this notification?");

            if (confirmDelete) {
              onDelete?.(notification.id);
            }
          }}
          className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NotificationCard;
