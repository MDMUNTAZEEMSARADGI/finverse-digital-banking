import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

import type { Notification } from "../../notification/types/notification.types";

interface NotificationsProps {
  notifications: Notification[];
}

const Notifications = ({
  notifications,
}: NotificationsProps) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Notifications
        </h2>

        <Link
          to="/notifications"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View All
        </Link>
      </div>

      {notifications.length === 0 ? (
        <p className="text-center text-gray-500">
          No notifications found.
        </p>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start gap-4 rounded-xl border p-4 transition hover:bg-gray-50 ${
                notification.status === "UNREAD"
                  ? "border-blue-300 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <div className="rounded-full bg-blue-100 p-2">
                <Bell
                  size={18}
                  className="text-blue-600"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold">
                  {notification.title}
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  {notification.message}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  {new Date(
                    notification.createdAt
                  ).toLocaleString()}
                </p>
              </div>

              {notification.status === "UNREAD" && (
                <span className="mt-2 h-3 w-3 rounded-full bg-blue-500" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;