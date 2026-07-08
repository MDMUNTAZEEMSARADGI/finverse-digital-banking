import { Bell } from "lucide-react";

import type { Notification } from "../types/dashboard.types";

const notifications: Notification[] = [
  {
    id: "1",
    title: "Salary Credited",
    message: "₹85,000 has been credited to your Savings Account.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    title: "KYC Approved",
    message: "Your KYC verification has been approved.",
    time: "Yesterday",
    read: true,
  },
  {
    id: "3",
    title: "Transfer Successful",
    message: "₹5,000 transferred successfully.",
    time: "2 days ago",
    read: true,
  },
];

const Notifications = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Notifications</h2>

        <button className="text-sm font-medium text-blue-600 hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start gap-4 rounded-xl border p-4 transition hover:bg-gray-50 ${
              !notification.read
                ? "border-blue-300 bg-blue-50"
                : "border-gray-200"
            }`}
          >
            <div className="rounded-full bg-blue-100 p-2">
              <Bell size={18} className="text-blue-600" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold">{notification.title}</h3>

              <p className="mt-1 text-sm text-gray-600">
                {notification.message}
              </p>

              <p className="mt-2 text-xs text-gray-400">{notification.time}</p>
            </div>

            {!notification.read && (
              <span className="mt-2 h-3 w-3 rounded-full bg-blue-500"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
